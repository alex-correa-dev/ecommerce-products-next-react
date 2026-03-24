import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('react-icons/fa', () => ({
  FaUser: () => <svg data-testid="user-icon" />,
  FaShoppingCart: () => <svg data-testid="cart-icon" />,
  FaBars: () => <svg data-testid="bars-icon" />,
}));

jest.mock('./DesktopNav', () => ({
  DesktopNav: () => <nav data-testid="desktop-nav">Desktop Navigation</nav>,
}));

jest.mock('./MobileNav', () => ({
  MobileNav: ({ isProductPage, productName, onMenuClick }: any) => (
    <div data-testid="mobile-nav">
      {isProductPage ? `Product: ${productName}` : 'Mobile Navigation'}
      <button onClick={onMenuClick} data-testid="mobile-menu-trigger">
        Open Menu
      </button>
    </div>
  ),
}));

jest.mock('./MobileMenu', () => ({
  MobileMenu: ({ isOpen, onClose }: any) => (
    isOpen ? (
      <div data-testid="mobile-menu">
        Mobile Menu
        <button onClick={onClose} data-testid="close-menu">Close</button>
      </div>
    ) : null
  ),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop Layout', () => {
    it('should render desktop layout on large screens', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
      expect(screen.getByAltText('Ice Dreams Logo')).toBeInTheDocument();
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
      expect(screen.getAllByTestId('cart-icon').length).toBeGreaterThan(0);
    });

    it('should have logo link pointing to home', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const logoLink = screen.getByRole('link', { name: /ice dreams logo/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should have correct button aria labels', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.getByLabelText('User account')).toBeInTheDocument();
      const cartButtons = screen.getAllByLabelText('Shopping cart');
      expect(cartButtons.length).toBe(2);
    });
  });

  describe('Mobile Layout', () => {
    it('should render mobile layout on small screens', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
      expect(screen.getAllByTestId('cart-icon').length).toBeGreaterThan(0);
      expect(screen.getByTestId('bars-icon')).toBeInTheDocument();
    });

    it('should show logo on home page in mobile layout', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.getByTestId('mobile-nav')).toHaveTextContent('Mobile Navigation');
    });

    it('should show product name on product page in mobile layout', () => {
      (usePathname as jest.Mock).mockReturnValue('/products/1');
      render(<Header />);
      
      expect(screen.getByTestId('mobile-nav')).toHaveTextContent('Product: Produto');
    });

    it('should have cart button with aria label', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const cartButtons = screen.getAllByLabelText('Shopping cart');
      expect(cartButtons.length).toBeGreaterThan(0);
    });

    it('should have menu button with aria label', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.getByLabelText('Menu')).toBeInTheDocument();
    });
  });

  describe('Mobile Menu', () => {
    it('should open mobile menu when clicking menu button', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Menu');
      fireEvent.click(menuButton);
      
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    });

    it('should open mobile menu when clicking mobile nav trigger', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const menuTrigger = screen.getByTestId('mobile-menu-trigger');
      fireEvent.click(menuTrigger);
      
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    });

    it('should close mobile menu when clicking close button', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Menu');
      fireEvent.click(menuButton);
      
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
      
      const closeButton = screen.getByTestId('close-menu');
      fireEvent.click(closeButton);
      
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });

    it('should close mobile menu when calling onClose', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const menuTrigger = screen.getByTestId('mobile-menu-trigger');
      fireEvent.click(menuTrigger);
      
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
      
      const closeButton = screen.getByTestId('close-menu');
      fireEvent.click(closeButton);
      
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });
  });

  describe('Product Page Detection', () => {
    it('should detect product page correctly for /products/1', () => {
      (usePathname as jest.Mock).mockReturnValue('/products/1');
      render(<Header />);
      
      expect(screen.getByTestId('mobile-nav')).toHaveTextContent('Product: Produto');
    });

    it('should detect product page correctly for /products/123', () => {
      (usePathname as jest.Mock).mockReturnValue('/products/123');
      render(<Header />);
      
      expect(screen.getByTestId('mobile-nav')).toHaveTextContent('Product: Produto');
    });

    it('should not detect home page as product page', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.getByTestId('mobile-nav')).not.toHaveTextContent('Product:');
    });

    it('should not detect products listing as product page', () => {
      (usePathname as jest.Mock).mockReturnValue('/products');
      render(<Header />);
      
      expect(screen.getByTestId('mobile-nav')).not.toHaveTextContent('Product:');
    });

    it('should not detect about page as product page', () => {
      (usePathname as jest.Mock).mockReturnValue('/about');
      render(<Header />);
      
      expect(screen.getByTestId('mobile-nav')).not.toHaveTextContent('Product:');
    });
  });

  describe('Logo', () => {
    it('should render logo with correct attributes', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const logo = screen.getByAltText('Ice Dreams Logo');
      expect(logo).toHaveAttribute('src', '/vercel.svg');
    });
  });

  describe('Icons', () => {
    it('should render user icon', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    });

    it('should render cart icon in desktop', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const cartIcons = screen.getAllByTestId('cart-icon');
      expect(cartIcons.length).toBeGreaterThan(0);
    });

    it('should render bars icon in mobile', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.getByTestId('bars-icon')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should initialize with menu closed', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });

    it('should toggle menu state correctly', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Menu');
      
      fireEvent.click(menuButton);
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
      
      const closeButton = screen.getByTestId('close-menu');
      fireEvent.click(closeButton);
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });
  });
});