import { render, screen } from '@testing-library/react';
import { MobileNav } from './MobileNav';

jest.mock('next/link', () => {
  const MockedLink = ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockedLink.displayName = 'Link';
  return MockedLink;
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('react-icons/fa', () => ({
  FaArrowLeft: () => <svg data-testid="arrow-left-icon" />,
}));

describe('MobileNav', () => {
  describe('when on home page (not product page)', () => {
    const defaultProps = {
      isProductPage: false,
      productName: '',
    };

    it('should render logo when not on product page', () => {
      render(<MobileNav {...defaultProps} />);
      
      const logo = screen.getByAltText('Ice Dreams Logo');
      expect(logo).toBeInTheDocument();
    });

    it('should have logo linking to home page', () => {
      render(<MobileNav {...defaultProps} />);
      
      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should not render back button when not on product page', () => {
      render(<MobileNav {...defaultProps} />);
      
      const backButton = screen.queryByLabelText('Go back');
      expect(backButton).not.toBeInTheDocument();
    });

    it('should not render product name element when not on product page', () => {
      render(<MobileNav {...defaultProps} />);
    
      const productNameElement = document.querySelector('.truncate');
      expect(productNameElement).not.toBeInTheDocument();
    });

    it('should have correct logo image attributes', () => {
      render(<MobileNav {...defaultProps} />);
      
      const logo = screen.getByAltText('Ice Dreams Logo');
      expect(logo).toHaveAttribute('src', '/vercel.svg');
      expect(logo).toHaveAttribute('width', '100');
      expect(logo).toHaveAttribute('height', '50');
    });
  });

  describe('when on product page', () => {
    const productPageProps = {
      isProductPage: true,
      productName: 'Smartphone XYZ',
    };

    it('should render back button on product page', () => {
      render(<MobileNav {...productPageProps} />);
      
      const backButton = screen.getByLabelText('Go back');
      expect(backButton).toBeInTheDocument();
    });

    it('should have back button linking to home page', () => {
      render(<MobileNav {...productPageProps} />);
      
      const backButton = screen.getByLabelText('Go back');
      expect(backButton).toHaveAttribute('href', '/');
    });

    it('should render product name on product page', () => {
      render(<MobileNav {...productPageProps} />);
      
      expect(screen.getByText('Smartphone XYZ')).toBeInTheDocument();
    });

    it('should not render logo on product page', () => {
      render(<MobileNav {...productPageProps} />);
      
      const logo = screen.queryByAltText('Ice Dreams Logo');
      expect(logo).not.toBeInTheDocument();
    });

    it('should render back arrow icon', () => {
      render(<MobileNav {...productPageProps} />);
      
      const arrowIcon = screen.getByTestId('arrow-left-icon');
      expect(arrowIcon).toBeInTheDocument();
    });

    it('should truncate long product names', () => {
      const longProductName = 'This is a very long product name that should be truncated when displayed on mobile devices';
      render(
        <MobileNav
          isProductPage={true}
          productName={longProductName}
        />
      );
      
      const productNameElement = screen.getByText(longProductName);
      expect(productNameElement).toBeInTheDocument();
      expect(productNameElement).toHaveClass('truncate');
    });

    it('should limit product name width', () => {
      render(<MobileNav {...productPageProps} />);
      
      const productNameElement = screen.getByText('Smartphone XYZ');
      expect(productNameElement).toHaveClass('max-w-[200px]');
    });

    it('should have product name with medium font weight', () => {
      render(<MobileNav {...productPageProps} />);
      
      const productNameElement = screen.getByText('Smartphone XYZ');
      expect(productNameElement).toHaveClass('font-medium');
    });
  });

  describe('accessibility', () => {
    it('should have aria-label on back button for screen readers', () => {
      render(
        <MobileNav
          isProductPage={true}
          productName="Test Product"
        />
      );
      
      const backButton = screen.getByLabelText('Go back');
      expect(backButton).toBeInTheDocument();
    });

    it('should have alt text on logo for screen readers', () => {
      render(
        <MobileNav
          isProductPage={false}
          productName=""
        />
      );
      
      const logo = screen.getByAltText('Ice Dreams Logo');
      expect(logo).toBeInTheDocument();
    });

    it('should have product name as text content', () => {
      render(
        <MobileNav
          isProductPage={true}
          productName="Test Product"
        />
      );
      
      const productNameElement = screen.getByText('Test Product');
      expect(productNameElement).toBeVisible();
    });
  });

  describe('conditional rendering', () => {
    it('should switch from logo to back button when navigating to product page', () => {
      const { rerender } = render(
        <MobileNav isProductPage={false} productName="" />
      );
      
      expect(screen.getByAltText('Ice Dreams Logo')).toBeInTheDocument();
      expect(screen.queryByLabelText('Go back')).not.toBeInTheDocument();
      
      rerender(<MobileNav isProductPage={true} productName="Product" />);
      
      expect(screen.queryByAltText('Ice Dreams Logo')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Go back')).toBeInTheDocument();
      expect(screen.getByText('Product')).toBeInTheDocument();
    });

    it('should handle empty product name on product page', () => {
      render(
        <MobileNav
          isProductPage={true}
          productName=""
        />
      );
      
      const productNameElement = document.querySelector('.truncate');
      expect(productNameElement).toBeInTheDocument();
      expect(productNameElement).toBeInTheDocument();
      expect(productNameElement).toHaveClass('truncate');
    });
  });

  describe('navigation behavior', () => {
    it('should navigate to home when clicking back button', () => {
      render(
        <MobileNav
          isProductPage={true}
          productName="Test Product"
        />
      );
      
      const backButton = screen.getByLabelText('Go back');
      expect(backButton).toHaveAttribute('href', '/');
    });

    it('should navigate to home when clicking logo', () => {
      render(
        <MobileNav
          isProductPage={false}
          productName=""
        />
      );
      
      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });
});