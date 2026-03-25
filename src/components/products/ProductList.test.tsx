import { render, screen } from '@testing-library/react';
import { ProductList } from './ProductList';
import type { Product } from '@/services/types';

jest.mock('./ProductCard', () => ({
  ProductCard: ({ product }: { product: Product }) => (
    <div data-testid={`product-card-${product.id}`}>
      {product.title}
    </div>
  ),
}));

jest.mock('./ProductListSkeleton', () => ({
  ProductListSkeleton: () => <div data-testid="skeleton">Loading...</div>,
}));

jest.mock('./ProductListEmpty', () => ({
  ProductListEmpty: () => <div data-testid="empty-state">No products found</div>,
}));

jest.mock('./ProductListError', () => ({
  ProductListError: ({ error }: { error: Error }) => (
    <div data-testid="error-state">Error: {error.message}</div>
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
  {
    id: 3,
    title: 'Product 3',
    price: 199.99,
    description: 'Description 3',
    category: 'books',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 4.8, count: 50 },
  },
];

describe('ProductList', () => {
  it('should render skeleton when loading', () => {
    render(
      <ProductList
        products={[]}
        isLoading={true}
        error={null}
      />
    );
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-card-1')).not.toBeInTheDocument();
  });

  it('should render error state when error occurs', () => {
    const error = new Error('Failed to fetch products');
    render(
      <ProductList
        products={[]}
        isLoading={false}
        error={error}
      />
    );
    
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.getByText('Error: Failed to fetch products')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
  });

  it('should render empty state when products array is empty', () => {
    render(
      <ProductList
        products={[]}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
  });

  it('should render empty state when products is null', () => {
    render(
      <ProductList
        products={null as unknown as Product[]}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('should render empty state when products is undefined', () => {
    render(
      <ProductList
        products={undefined as unknown as Product[]}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('should render product cards when products are available', () => {
    render(
      <ProductList
        products={mockProducts}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
  });

  it('should render correct number of product cards', () => {
    render(
      <ProductList
        products={mockProducts}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    
    const productCards = [
      screen.getByTestId('product-card-1'),
      screen.getByTestId('product-card-2'),
      screen.getByTestId('product-card-3'),
    ];
    expect(productCards).toHaveLength(3);
  });

  it('should render product titles correctly', () => {
    render(
      <ProductList
        products={mockProducts}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  it('should prioritize loading over error', () => {
    render(
      <ProductList
        products={[]}
        isLoading={true}
        error={new Error('Some error')}
      />
    );
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
  });

  it('should prioritize loading over empty state', () => {
    render(
      <ProductList
        products={[]}
        isLoading={true}
        error={null}
      />
    );
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
  });

  it('should prioritize error over empty state', () => {
    render(
      <ProductList
        products={[]}
        isLoading={false}
        error={new Error('Some error')}
      />
    );
    
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
  });

  it('should render products when all conditions are satisfied', () => {
    render(
      <ProductList
        products={mockProducts}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
  });

  it('should handle single product', () => {
    const singleProduct = [mockProducts[0]];
    render(
      <ProductList
        products={singleProduct}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-2')).not.toBeInTheDocument();
  });

  it('should render grid container when products are present', () => {
    render(
      <ProductList
        products={mockProducts}
        isLoading={false}
        error={null}
      />
    );
    
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });

  it('should not render grid container when loading', () => {
    render(
      <ProductList
        products={[]}
        isLoading={true}
        error={null}
      />
    );
    
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).not.toBeInTheDocument();
  });

  it('should pass correct product to ProductCard', () => {
    render(
      <ProductList
        products={mockProducts}
        isLoading={false}
        error={null}
      />
    );
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });
});