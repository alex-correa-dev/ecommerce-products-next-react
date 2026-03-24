import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from './MobileMenu';

jest.mock('next/link', () => {
  const MockedLink = ({ href, children, onClick, ...props }: any) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  );
  MockedLink.displayName = 'Link';
  return MockedLink;
});

jest.mock('react-icons/fa', () => ({
  FaTimes: () => <svg data-testid="close-icon" />,
}));

describe('MobileMenu', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = 'unset';
  });

  describe('when menu is closed', () => {
    it('should not render anything when isOpen is false', () => {
      render(
        <MobileMenu
          isOpen={false}
          onClose={mockOnClose}
        />
      );
      
      const overlay = document.querySelector('.fixed.inset-0');
      const menu = document.querySelector('.fixed.left-0');
      
      expect(overlay).not.toBeInTheDocument();
      expect(menu).not.toBeInTheDocument();
    });

    it('should not render navigation links when closed', () => {
      render(
        <MobileMenu
          isOpen={false}
          onClose={mockOnClose}
        />
      );
      
      expect(screen.queryByText('O início')).not.toBeInTheDocument();
      expect(screen.queryByText('Produtos')).not.toBeInTheDocument();
      expect(screen.queryByText('Quem somos')).not.toBeInTheDocument();
      expect(screen.queryByText('Contato')).not.toBeInTheDocument();
    });
  });

  describe('when menu is open', () => {
    beforeEach(() => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
    });

    it('should render overlay when menu is open', () => {
      const overlay = document.querySelector('.fixed.inset-0');
      expect(overlay).toBeInTheDocument();
    });

    it('should render menu panel when menu is open', () => {
      const menuPanel = document.querySelector('.fixed.left-0');
      expect(menuPanel).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      expect(screen.getByText('O início')).toBeInTheDocument();
      expect(screen.getByText('Produtos')).toBeInTheDocument();
      expect(screen.getByText('Quem somos')).toBeInTheDocument();
      expect(screen.getByText('Contato')).toBeInTheDocument();
    });

    it('should render close button', () => {
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toBeInTheDocument();
    });

    it('should render close icon', () => {
      const closeIcon = screen.getByTestId('close-icon');
      expect(closeIcon).toBeInTheDocument();
    });

    it('should have correct number of links', () => {
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(4);
    });

    it('should have correct href for each link', () => {
      const inicioLink = screen.getByText('O início');
      const produtosLink = screen.getByText('Produtos');
      const quemSomosLink = screen.getByText('Quem somos');
      const contatoLink = screen.getByText('Contato');
      
      expect(inicioLink).toHaveAttribute('href', '/');
      expect(produtosLink).toHaveAttribute('href', '/products');
      expect(quemSomosLink).toHaveAttribute('href', '/about');
      expect(contatoLink).toHaveAttribute('href', '/contact');
    });

    it('should render links in correct order', () => {
      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveTextContent('O início');
      expect(links[1]).toHaveTextContent('Produtos');
      expect(links[2]).toHaveTextContent('Quem somos');
      expect(links[3]).toHaveTextContent('Contato');
    });
  });

  describe('interactions', () => {
    it('should call onClose when clicking overlay', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const overlay = document.querySelector('.fixed.inset-0');
      fireEvent.click(overlay!);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when clicking close button', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const closeButton = screen.getByLabelText('Close menu');
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when clicking a navigation link', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const productLink = screen.getByText('Produtos');
      fireEvent.click(productLink);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when clicking any navigation link', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const links = ['O início', 'Produtos', 'Quem somos', 'Contato'];
      
      links.forEach(linkText => {
        const link = screen.getByText(linkText);
        fireEvent.click(link);
      });
      
      expect(mockOnClose).toHaveBeenCalledTimes(4);
    });
  });

  describe('body overflow control', () => {
    it('should prevent body scrolling when menu opens', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scrolling when menu closes', () => {
      const { rerender } = render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      expect(document.body.style.overflow).toBe('hidden');
      
      rerender(
        <MobileMenu
          isOpen={false}
          onClose={mockOnClose}
        />
      );
      
      expect(document.body.style.overflow).toBe('unset');
    });

    it('should restore body scrolling on unmount', () => {
      const { unmount } = render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      expect(document.body.style.overflow).toBe('hidden');
      
      unmount();
      
      expect(document.body.style.overflow).toBe('unset');
    });

    it('should not affect body scroll when menu is initially closed', () => {
      render(
        <MobileMenu
          isOpen={false}
          onClose={mockOnClose}
        />
      );
      
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('accessibility', () => {
    it('should have close button with aria-label', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toBeInTheDocument();
    });

    it('should have navigation with semantic HTML', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const nav = document.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveProperty('tagName', 'NAV');
    });

    it('should have all links with visible text', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link.textContent).toBeTruthy();
        expect(link.textContent?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('navigation', () => {
    it('should navigate to home page when clicking "O início"', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const homeLink = screen.getByText('O início');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should navigate to products page when clicking "Produtos"', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const productsLink = screen.getByText('Produtos');
      expect(productsLink).toHaveAttribute('href', '/products');
    });

    it('should navigate to about page when clicking "Quem somos"', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const aboutLink = screen.getByText('Quem somos');
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('should navigate to contact page when clicking "Contato"', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const contactLink = screen.getByText('Contato');
      expect(contactLink).toHaveAttribute('href', '/contact');
    });
  });

  describe('menu structure', () => {
    it('should have menu panel with correct positioning', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const menuPanel = document.querySelector('.fixed.left-0');
      expect(menuPanel).toBeInTheDocument();
      expect(menuPanel).toHaveClass('top-0');
      expect(menuPanel).toHaveClass('bottom-0');
    });

    it('should have close button at top right', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const closeButtonContainer = document.querySelector('.flex.justify-end');
      expect(closeButtonContainer).toBeInTheDocument();
    });

    it('should have vertical navigation layout', () => {
      render(
        <MobileMenu
          isOpen={true}
          onClose={mockOnClose}
        />
      );
      
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('flex-col');
    });
  });
});