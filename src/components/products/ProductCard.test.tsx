import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/services/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, className, sizes, alt, src } = props;
    return <img data-testid="product-image" alt={alt} src={src} />;
  },
}));

jest.mock('next/link', () => {
  const MockedLink = ({ href, children, className }: any) => (
    <a href={href} className={className} data-testid={`link-${href.replace(/\//g, '-')}`}>
      {children}
    </a>
  );
  MockedLink.displayName = 'Link';
  return MockedLink;
});

jest.mock('@mui/material/Card', () => {
  return function MockCard({ children, className }: any) {
    return <div data-testid="card" className={className}>{children}</div>;
  };
});

jest.mock('@mui/material/CardContent', () => {
  return function MockCardContent({ children, className }: any) {
    return <div data-testid="card-content" className={className}>{children}</div>;
  };
});

jest.mock('@mui/material/CardMedia', () => {
  return function MockCardMedia({ children, component, className }: any) {
    return <div data-testid="card-media" className={className}>{children}</div>;
  };
});

jest.mock('@mui/material/CardActions', () => {
  return function MockCardActions({ children, className }: any) {
    return <div data-testid="card-actions" className={className}>{children}</div>;
  };
});

jest.mock('@mui/material/Typography', () => {
  return function MockTypography({ children, variant, component, className }: any) {
    const Component = component || 'div';
    return (
      <div data-testid={`typography-${variant}`} className={className} as={Component}>
        {children}
      </div>
    );
  };
});

jest.mock('@mui/material/Button', () => {
  return function MockButton({ children, onClick, component: Component, href, variant, fullWidth, className }: any) {
    if (Component) {
      return (
        <Component href={href} data-testid="button-link" className={className}>
          {children}
        </Component>
      );
    }
    return (
      <button data-testid="button" className={className}>
        {children}
      </button>
    );
  };
});

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/test.jpg',
  rating: { rate: 4.5, count: 10 },
};

describe('ProductCard', () => {
  it('should render product title', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should render product category', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('electronics')).toBeInTheDocument();
  });

  it('should render product price formatted correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('R$ 99.99')).toBeInTheDocument();
  });

  it('should render "Ver mais" button', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Ver mais')).toBeInTheDocument();
  });

  it('should render product image', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByTestId('product-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveAttribute('alt', mockProduct.title);
  });

  it('should have title linking to product page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const titleLink = screen.getByText('Test Product').closest('a');
    expect(titleLink).toHaveAttribute('href', '/products/1');
  });

  it('should have image linking to product page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const links = screen.getAllByRole('link');
    const imageLink = links.find(link => link.querySelector('[data-testid="product-image"]'));
    expect(imageLink).toBeInTheDocument();
    expect(imageLink).toHaveAttribute('href', '/products/1');
    });

  it('should have button linking to product page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const button = screen.getByText('Ver mais');
    const buttonLink = button.closest('a');
    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink).toHaveAttribute('href', '/products/1');
    });

  it('should have all links pointing to same product page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '/products/1');
    });
  });

  it('should have correct number of links', () => {
    render(<ProductCard product={mockProduct} />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('should render card structure', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-media')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('card-actions')).toBeInTheDocument();
  });

  it('should render category with body2 variant', () => {
    render(<ProductCard product={mockProduct} />);
    
    const category = screen.getByTestId('typography-body2');
    expect(category).toBeInTheDocument();
  });

  it('should render price with h6 variant', () => {
    render(<ProductCard product={mockProduct} />);
    
    const priceElements = screen.getAllByTestId('typography-h6');
    const priceElement = priceElements.find(el => el.textContent === 'R$ 99.99');
    expect(priceElement).toBeInTheDocument();
  });

  it('should handle product with different price formatting', () => {
    const productWithDecimal = { ...mockProduct, price: 99.9 };
    render(<ProductCard product={productWithDecimal} />);
    
    expect(screen.getByText('R$ 99.90')).toBeInTheDocument();
  });

  it('should handle product with integer price', () => {
    const productWithInteger = { ...mockProduct, price: 100 };
    render(<ProductCard product={productWithInteger} />);
    
    expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
  });

  it('should handle product with zero price', () => {
    const productWithZero = { ...mockProduct, price: 0 };
    render(<ProductCard product={productWithZero} />);
    
    expect(screen.getByText('R$ 0.00')).toBeInTheDocument();
  });

  it('should handle long product title', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very long product title that might wrap to multiple lines on smaller screens',
    };
    render(<ProductCard product={longTitleProduct} />);
    
    expect(screen.getByText(longTitleProduct.title)).toBeInTheDocument();
  });

  it('should have image with fill attribute', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByTestId('product-image');
    expect(image).toBeInTheDocument();
  });

  it('should have button text "Ver mais"', () => {
    render(<ProductCard product={mockProduct} />);
    
    const button = screen.getByText('Ver mais');
    expect(button).toBeInTheDocument();
  });

  it('should render all typography elements', () => {
    render(<ProductCard product={mockProduct} />);
    
    const typographyElements = screen.getAllByTestId(/typography-/);
    expect(typographyElements.length).toBe(3);
  });
});