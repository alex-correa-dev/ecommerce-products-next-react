import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from './useProducts';
import { productService } from '../services/products';
import type { Product } from '../services/types';

jest.mock('../services/products');

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 99.99,
    description: 'Description 1',
    category: 'electronics',
    image: 'https://via.placeholder.com/150/1',
    rating: {
      rate: 4.5,
      count: 10,
    },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 149.99,
    description: 'Description 2',
    category: 'clothing',
    image: 'https://via.placeholder.com/150/2',
    rating: {
      rate: 4.2,
      count: 25,
    },
  },
  {
    id: 3,
    title: 'Product 3',
    price: 199.99,
    description: 'Description 3',
    category: 'electronics',
    image: 'https://via.placeholder.com/150/3',
    rating: {
      rate: 4.8,
      count: 50,
    },
  },
];

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

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return products list when query is successful', async () => {
    (productService.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.data).toHaveLength(3);
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no products exist', async () => {
    (productService.getProducts as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.data).toHaveLength(0);
  });

  it('should handle error when products fetch fails', async () => {
    const errorMessage = 'Failed to fetch products';
    (productService.getProducts as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe(errorMessage);
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should handle 404 error', async () => {
    const notFoundError = new Error('HTTP error! status: 404');
    (productService.getProducts as jest.Mock).mockRejectedValue(notFoundError);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('HTTP error! status: 404');
  });

  it('should handle 500 server error', async () => {
    const serverError = new Error('HTTP error! status: 500');
    (productService.getProducts as jest.Mock).mockRejectedValue(serverError);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('HTTP error! status: 500');
  });

  it('should handle network error', async () => {
    const networkError = new Error('Network error');
    (productService.getProducts as jest.Mock).mockRejectedValue(networkError);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Network error');
  });

  it('should handle timeout error', async () => {
    const timeoutError = new Error('Timeout');
    (productService.getProducts as jest.Mock).mockRejectedValue(timeoutError);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Timeout');
  });

  it('should maintain loading state while fetching', async () => {
    let resolvePromise: (value: Product[]) => void;
    const promise = new Promise<Product[]>((resolve) => {
      resolvePromise = resolve;
    });
    
    (productService.getProducts as jest.Mock).mockReturnValue(promise);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);
    expect(result.current.data).toBeUndefined();

    resolvePromise!(mockProducts);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProducts);
  });

  it('should cache products data after successful fetch', async () => {
    (productService.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { result, rerender } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(productService.getProducts).toHaveBeenCalledTimes(1);

    rerender();

    expect(productService.getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockProducts);
  });

  it('should refetch when explicitly invalidated', async () => {
    (productService.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(productService.getProducts).toHaveBeenCalledTimes(1);

    await queryClient.invalidateQueries({ queryKey: ['products'] });

    await waitFor(() => {
      expect(productService.getProducts).toHaveBeenCalledTimes(2);
    });
  });
});
