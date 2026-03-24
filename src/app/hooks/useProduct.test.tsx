import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProduct } from './useProduct';
import { productService } from '../services/products';
import type { Product } from '../services/types';

jest.mock('../services/products');

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 10,
  },
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useProduct', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return product data when query is successful', async () => {
    (productService.getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useProduct('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProduct);
    expect(productService.getProductById).toHaveBeenCalledWith('1');
    expect(productService.getProductById).toHaveBeenCalledTimes(1);
  });

  it('should not fetch when id is empty', async () => {
    const { result } = renderHook(() => useProduct(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(productService.getProductById).not.toHaveBeenCalled();
  });

  it('should not fetch when id is undefined', async () => {
    const { result } = renderHook(() => useProduct(undefined as unknown as string), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(productService.getProductById).not.toHaveBeenCalled();
  });

  it('should not fetch when id is null', async () => {
    const { result } = renderHook(() => useProduct(null as unknown as string), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(productService.getProductById).not.toHaveBeenCalled();
  });

  it('should handle error when product fetch fails', async () => {
    const errorMessage = 'Failed to fetch product';
    (productService.getProductById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProduct('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe(errorMessage);
    expect(productService.getProductById).toHaveBeenCalledWith('1');
  });

  it('should handle 404 error', async () => {
    const notFoundError = new Error('HTTP error! status: 404');
    (productService.getProductById as jest.Mock).mockRejectedValue(notFoundError);

    const { result } = renderHook(() => useProduct('999'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('HTTP error! status: 404');
  });

  it('should refetch when id changes', async () => {
    (productService.getProductById as jest.Mock)
      .mockResolvedValueOnce({ ...mockProduct, id: 1 })
      .mockResolvedValueOnce({ ...mockProduct, id: 2, title: 'Product 2' });

    const { result, rerender } = renderHook(({ id }) => useProduct(id), {
      wrapper: createWrapper(),
      initialProps: { id: '1' },
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.id).toBe(1);
    expect(productService.getProductById).toHaveBeenCalledWith('1');

    rerender({ id: '2' });

    await waitFor(() => {
      expect(result.current.data?.id).toBe(2);
    });

    expect(productService.getProductById).toHaveBeenCalledWith('2');
    expect(productService.getProductById).toHaveBeenCalledTimes(2);
  });

  it('should not refetch when id remains the same', async () => {
    (productService.getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const { result, rerender } = renderHook(({ id }) => useProduct(id), {
      wrapper: createWrapper(),
      initialProps: { id: '1' },
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(productService.getProductById).toHaveBeenCalledTimes(1);

    rerender({ id: '1' });

    expect(productService.getProductById).toHaveBeenCalledTimes(1);
  });

  it('should handle network error', async () => {
    const networkError = new Error('Network error');
    (productService.getProductById as jest.Mock).mockRejectedValue(networkError);

    const { result } = renderHook(() => useProduct('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Network error');
  });

  it('should handle timeout error', async () => {
    const timeoutError = new Error('Timeout');
    (productService.getProductById as jest.Mock).mockRejectedValue(timeoutError);

    const { result } = renderHook(() => useProduct('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Timeout');
  });

  it('should maintain loading state while fetching', async () => {
    let resolvePromise: (value: Product) => void;
    const promise = new Promise<Product>((resolve) => {
      resolvePromise = resolve;
    });
    
    (productService.getProductById as jest.Mock).mockReturnValue(promise);

    const { result } = renderHook(() => useProduct('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);

    resolvePromise!(mockProduct);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
