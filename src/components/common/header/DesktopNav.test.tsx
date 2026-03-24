import { render, screen } from '@testing-library/react';
import { DesktopNav } from './DesktopNav';

jest.mock('next/link', () => {
  const MockedLink = ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockedLink.displayName = 'Link';
  return MockedLink;
});

describe('DesktopNav', () => {
  it('should render all navigation links', () => {
    render(<DesktopNav />);
    
    expect(screen.getByText('O início')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Quem somos')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('should have correct number of links', () => {
    render(<DesktopNav />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
  });

  it('should have correct href for each link', () => {
    render(<DesktopNav />);
    
    const inicioLink = screen.getByText('O início');
    const produtosLink = screen.getByText('Produtos');
    const quemSomosLink = screen.getByText('Quem somos');
    const contatoLink = screen.getByText('Contato');
    
    expect(inicioLink).toHaveAttribute('href', '/');
    expect(produtosLink).toHaveAttribute('href', '/products');
    expect(quemSomosLink).toHaveAttribute('href', '/about');
    expect(contatoLink).toHaveAttribute('href', '/contact');
  });

  it('should navigate to home page when clicking "O início"', () => {
    render(<DesktopNav />);
    
    const inicioLink = screen.getByText('O início');
    expect(inicioLink).toHaveAttribute('href', '/');
  });

  it('should navigate to products page when clicking "Produtos"', () => {
    render(<DesktopNav />);
    
    const produtosLink = screen.getByText('Produtos');
    expect(produtosLink).toHaveAttribute('href', '/products');
  });

  it('should navigate to about page when clicking "Quem somos"', () => {
    render(<DesktopNav />);
    
    const quemSomosLink = screen.getByText('Quem somos');
    expect(quemSomosLink).toHaveAttribute('href', '/about');
  });

  it('should navigate to contact page when clicking "Contato"', () => {
    render(<DesktopNav />);
    
    const contatoLink = screen.getByText('Contato');
    expect(contatoLink).toHaveAttribute('href', '/contact');
  });

  it('should render links in correct order', () => {
    render(<DesktopNav />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('O início');
    expect(links[1]).toHaveTextContent('Produtos');
    expect(links[2]).toHaveTextContent('Quem somos');
    expect(links[3]).toHaveTextContent('Contato');
  });

  it('should have all links with consistent styling behavior', () => {
    render(<DesktopNav />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link).toBeVisible();
    });
  });

  it('should have unique keys for each link', () => {
    render(<DesktopNav />);
    
    const links = screen.getAllByRole('link');
    const hrefs = links.map(link => link.getAttribute('href'));
    const uniqueHrefs = [...new Set(hrefs)];
    
    expect(uniqueHrefs).toHaveLength(links.length);
  });

  it('should handle navigation to all routes', () => {
    render(<DesktopNav />);
    
    const expectedRoutes = [
      { label: 'O início', path: '/' },
      { label: 'Produtos', path: '/products' },
      { label: 'Quem somos', path: '/about' },
      { label: 'Contato', path: '/contact' },
    ];
    
    expectedRoutes.forEach(({ label, path }) => {
      const link = screen.getByText(label);
      expect(link).toHaveAttribute('href', path);
    });
  });

  it('should render navigation container with semantic HTML', () => {
    render(<DesktopNav />);
    
    const nav = document.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveProperty('tagName', 'NAV');
  });

  it('should have accessible link texts', () => {
    render(<DesktopNav />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link.textContent).toBeTruthy();
      expect(link.textContent?.trim().length).toBeGreaterThan(0);
    });
  });
});