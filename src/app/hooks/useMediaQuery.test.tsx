import { renderHook } from '@testing-library/react';
import useMediaQuery from './useMediaQuery';
import { isMobile, isTablet } from '../utils/viewports';

jest.mock('../utils/viewports');
jest.mock('../enums/viewports.enum', () => ({
  TypeViewPortsEnum: {
    MOBILE: 'MOBILE',
    TABLET: 'TABLET',
    DESKTOP: 'DESKTOP',
  },
}));

describe('useMediaQuery', () => {
  const originalInnerWidth = window.innerWidth;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    window.innerWidth = originalInnerWidth;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  it('should set DESKTOP viewport when screen is desktop size', () => {
    (isTablet as jest.Mock).mockReturnValue(false);
    (isMobile as jest.Mock).mockReturnValue(false);

    mockWindowWidth(1440);

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current).toBe('DESKTOP');
    expect(isTablet).toHaveBeenCalledWith(1440);
    expect(isMobile).toHaveBeenCalledWith(1440);
  });

  it('should set TABLET viewport when screen is tablet size', () => {
    (isTablet as jest.Mock).mockReturnValue(true);
    (isMobile as jest.Mock).mockReturnValue(false);

    mockWindowWidth(768);

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current).toBe('TABLET');
    expect(isTablet).toHaveBeenCalledWith(768);
    expect(isMobile).not.toHaveBeenCalled();
  });

  it('should set MOBILE viewport when screen is mobile size', () => {
    (isTablet as jest.Mock).mockReturnValue(false);
    (isMobile as jest.Mock).mockReturnValue(true);

    mockWindowWidth(375);

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current).toBe('MOBILE');
    expect(isTablet).toHaveBeenCalledWith(375);
    expect(isMobile).toHaveBeenCalledWith(375);
  });

  it('should add resize event listener on mount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    renderHook(() => useMediaQuery());

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it('should remove resize event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useMediaQuery());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('should handle different desktop sizes correctly', () => {
    (isTablet as jest.Mock).mockReturnValue(false);
    (isMobile as jest.Mock).mockReturnValue(false);

    const desktopSizes = [1024, 1280, 1440, 1920, 2560];

    desktopSizes.forEach((size) => {
      mockWindowWidth(size);
      const { result } = renderHook(() => useMediaQuery());
      expect(result.current).toBe('DESKTOP');
    });
  });

  it('should handle different tablet sizes correctly', () => {
    (isTablet as jest.Mock).mockReturnValue(true);
    (isMobile as jest.Mock).mockReturnValue(false);

    const tabletSizes = [600, 768, 800, 900];

    tabletSizes.forEach((size) => {
      mockWindowWidth(size);
      const { result } = renderHook(() => useMediaQuery());
      expect(result.current).toBe('TABLET');
    });
  });

  it('should handle different mobile sizes correctly', () => {
    (isTablet as jest.Mock).mockReturnValue(false);
    (isMobile as jest.Mock).mockReturnValue(true);

    const mobileSizes = [320, 375, 414, 480];

    mobileSizes.forEach((size) => {
      mockWindowWidth(size);
      const { result } = renderHook(() => useMediaQuery());
      expect(result.current).toBe('MOBILE');
    });
  });

  it('should prioritize tablet check over mobile check', () => {
    (isTablet as jest.Mock).mockReturnValue(true);
    (isMobile as jest.Mock).mockReturnValue(true);

    mockWindowWidth(768);

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current).toBe('TABLET');
    expect(isTablet).toHaveBeenCalled();
    expect(isMobile).not.toHaveBeenCalled();
  });

  it('should return undefined on initial render before calculation', () => {
    (isTablet as jest.Mock).mockReturnValue(false);
    (isMobile as jest.Mock).mockReturnValue(false);

    let result: { current: string | undefined };

    renderHook(() => {
      result = useMediaQuery();
      return result;
    });

    expect(result!.current).toBeUndefined();
  });
});
