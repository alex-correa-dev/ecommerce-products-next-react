import { render, screen } from '@testing-library/react';
import { ProductDetails } from './ProductDetails';
import { useProduct } from '../../app/hooks/useProduct';
import type { Product } from '../../app/services/types';

jest.mock('../../app/hooks/useProduct');

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img data-testid="product-image" alt={props.alt} src={props.src} />;
  },
}));

jest.mock('react-icons/fa', () => ({
  FaStar: ({ className }: any) => <div data-testid="star-icon" className={className} />,
}));

jest.mock('./ProductSkeleton', () => ({
  ProductSkeleton: () => <div data-testid="skeleton">Loading...</div>,
}));

jest.mock('./ProductError', () => ({
  ProductError: ({ error }: any) => (
    <div data-testid="error-state">Error: {error.message}</div>
  ),
}));

jest.mock('@mui/material/Typography', () => {
  return function MockTypography({ children, variant, component }: any) {
    const Component = component || 'div';
    return (
      <div data-testid={`typography-${variant}`} as={Component}>
        {children}
      </div>
    );
  };
});

jest.mock('@mui/material/Card', () => {
  return function MockCard({ children }: any) {
    return <div data-testid="card">{children}</div>;
  };
});

jest.mock('@mui/material/CardContent', () => {
  return function MockCardContent({ children }: any) {
    return <div data-testid="card-content">{children}</div>;
  };
});

jest.mock('@mui/material/Button', () => {
  return function MockButton({ children }: any) {
    return <button data-testid="add-to-cart-button">{children}</button>;
  };
});

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product description',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/test.jpg',
  rating: { rate: 4.5, count: 10 },
};

describe('ProductDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render skeleton when loading', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
    expect(screen.queryByText('Produto não encontrado')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-image')).not.toBeInTheDocument();
  });

  it('should render error state when error occurs', () => {
    const error = new Error('Failed to fetch product');
    (useProduct as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error,
    });

    render(<ProductDetails productId="1" />);
    
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.getByText('Error: Failed to fetch product')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByText('Produto não encontrado')).not.toBeInTheDocument();
  });

  it('should render product not found when product is null', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="999" />);
    
    expect(screen.getByText('Produto não encontrado')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
  });

  it('should render product details when data is loaded', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getAllByText('electronics')).toHaveLength(2);
    expect(screen.getByText('R$ 99.99')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByText('(10 avaliações)')).toBeInTheDocument();
  });

  it('should render product image', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    const image = screen.getByTestId('product-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveAttribute('alt', mockProduct.title);
  });

  it('should render rating stars', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    const stars = screen.getAllByTestId('star-icon');
    expect(stars).toHaveLength(5);
  });

  it('should render additional information card', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    expect(screen.getByText('Informações adicionais')).toBeInTheDocument();
    expect(screen.getByText('Categoria:')).toBeInTheDocument();
    expect(screen.getByText('Avaliação média:')).toBeInTheDocument();
    expect(screen.getByText('Total de avaliações:')).toBeInTheDocument();
    expect(screen.getAllByText('electronics')).toHaveLength(2);
    expect(screen.getByText('4.5 / 5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should render add to cart button', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    const button = screen.getByTestId('add-to-cart-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Adicionar ao carrinho');
  });

  it('should render title with h1 component', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    const title = screen.getByTestId('typography-h4');
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute('as', 'h1');
  });

  it('should render price with h5 variant', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    const price = screen.getByTestId('typography-h5');
    expect(price).toBeInTheDocument();
  });

  it('should render description with body1 variant', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    const description = screen.getByTestId('typography-body1');
    expect(description).toBeInTheDocument();
  });

  it('should call useProduct with correct productId', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="123" />);
    
    expect(useProduct).toHaveBeenCalledWith('123');
  });

  it('should handle product with different rating values', () => {
    const productWithLowRating = {
      ...mockProduct,
      rating: { rate: 2.3, count: 5 },
    };
    
    (useProduct as jest.Mock).mockReturnValue({
      data: productWithLowRating,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    expect(screen.getByText('2.3 / 5')).toBeInTheDocument();
    expect(screen.getByText('(5 avaliações)')).toBeInTheDocument();
  });

  it('should handle product with zero rating', () => {
    const productWithZeroRating = {
      ...mockProduct,
      rating: { rate: 0, count: 0 },
    };
    
    (useProduct as jest.Mock).mockReturnValue({
      data: productWithZeroRating,
      isLoading: false,
      error: null,
    });

    render(<ProductDetails productId="1" />);
    
    expect(screen.getByText('0 / 5')).toBeInTheDocument();
    expect(screen.getByText('(0 avaliações)')).toBeInTheDocument();
  });

  it('should prioritize loading over error', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: new Error('Some error'),
    });

    render(<ProductDetails productId="1" />);
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
  });

  it('should prioritize error over not found', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Some error'),
    });

    render(<ProductDetails productId="1" />);
    
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.queryByText('Produto não encontrado')).not.toBeInTheDocument();
  });
});