import { render, screen } from '@testing-library/react';
import { ProductsContainer } from './ProductsContainer';
import { useProducts } from '../../app/hooks/useProducts';
import type { Product } from '../../app/services/types';

jest.mock('../../app/hooks/useProducts');

jest.mock('./ProductList', () => ({
  ProductList: ({ products, isLoading, error }: any) => (
    <div data-testid="product-list">
      {isLoading && <span data-testid="loading-state">Loading...</span>}
      {error && <span data-testid="error-state">Error: {error.message}</span>}
      {!isLoading && !error && products && (
        <span data-testid="success-state">
          {products.length} products loaded
        </span>
      )}
    </div>
  ),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 99.99,
    description: 'Description 1',
    category: 'electronics',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 149.99,
    description: 'Description 2',
    category: 'clothing',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 4.2, count: 25 },
  },
];

describe('ProductsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state when products are loading', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<ProductsContainer />);
    
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-state')).not.toBeInTheDocument();
  });

  it('should render products when data is loaded successfully', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<ProductsContainer />);
    
    expect(screen.getByTestId('success-state')).toBeInTheDocument();
    expect(screen.getByText('2 products loaded')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
  });

  it('should render empty array when no products exist', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<ProductsContainer />);
    
    expect(screen.getByTestId('success-state')).toBeInTheDocument();
    expect(screen.getByText('0 products loaded')).toBeInTheDocument();
  });

  it('should render error state when fetch fails', () => {
    const errorMessage = 'Failed to fetch products';
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
    });

    render(<ProductsContainer />);
    
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('success-state')).not.toBeInTheDocument();
  });

  it('should handle different error types', () => {
    const networkError = new Error('Network error');
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: networkError,
    });

    render(<ProductsContainer />);
    
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.getByText('Error: Network error')).toBeInTheDocument();
  });

  it('should pass correct props to ProductList', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    render(<ProductsContainer />);
    
    expect(screen.getByTestId('success-state')).toHaveTextContent('2 products loaded');
  });

  it('should pass empty array when data is undefined', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    render(<ProductsContainer />);
    
    expect(screen.getByTestId('success-state')).toBeInTheDocument();
    expect(screen.getByText('0 products loaded')).toBeInTheDocument();
  });

  it('should handle loading then success transition', () => {
    const { rerender } = render(<ProductsContainer />);
    
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });
    
    rerender(<ProductsContainer />);
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    
    (useProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });
    
    rerender(<ProductsContainer />);
    expect(screen.getByTestId('success-state')).toBeInTheDocument();
    expect(screen.getByText('2 products loaded')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
  });

  it('should handle loading then error transition', () => {
    const { rerender } = render(<ProductsContainer />);
    
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });
    
    rerender(<ProductsContainer />);
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    
    const errorMessage = 'Failed to fetch';
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
    });
    
    rerender(<ProductsContainer />);
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument();
  });

  it('should call useProducts hook', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<ProductsContainer />);
    
    expect(useProducts).toHaveBeenCalledTimes(1);
  });
});