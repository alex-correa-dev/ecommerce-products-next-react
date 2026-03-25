import { render, screen } from '@testing-library/react';
import { ProductListEmpty } from './ProductListEmpty';

jest.mock('@/components/ui/Card', () => ({
  Card: ({ children, className }: any) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
}));

jest.mock('@/components/ui/CardContent', () => ({
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
}));

jest.mock('@/components/ui/Typography', () => ({
  Typography: ({ children, variant, className }: any) => (
    <div data-testid={`typography-${variant}`} className={className}>
      {children}
    </div>
  ),
}));

describe('ProductListEmpty', () => {
  it('should render empty state message', () => {
    render(<ProductListEmpty />);
    
    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
  });

  it('should render suggestion message', () => {
    render(<ProductListEmpty />);
    
    expect(screen.getByText('Tente novamente mais tarde')).toBeInTheDocument();
  });

  it('should render both messages', () => {
    render(<ProductListEmpty />);
    
    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
    expect(screen.getByText('Tente novamente mais tarde')).toBeInTheDocument();
  });

  it('should render suggestion with body2 variant', () => {
    render(<ProductListEmpty />);
    
    const suggestion = screen.getByTestId('typography-body2');
    expect(suggestion).toBeInTheDocument();
    expect(suggestion).toHaveTextContent('Tente novamente mais tarde');
  });

  it('should render suggestion with text-gray-400 class', () => {
    render(<ProductListEmpty />);
    
    const suggestion = screen.getByTestId('typography-body2');
    expect(suggestion).toHaveClass('text-gray-400');
  });

  it('should render suggestion with mt-2 class', () => {
    render(<ProductListEmpty />);
    
    const suggestion = screen.getByTestId('typography-body2');
    expect(suggestion).toHaveClass('mt-2');
  });

  it('should have card content structure', () => {
    render(<ProductListEmpty />);
    
    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
  });

  it('should render title inside card content', () => {
    render(<ProductListEmpty />);
    
    const cardContent = screen.getByTestId('card-content');
    const title = screen.getByTestId('typography-h6');
    
    expect(cardContent).toContainElement(title);
  });

  it('should render suggestion inside card content', () => {
    render(<ProductListEmpty />);
    
    const cardContent = screen.getByTestId('card-content');
    const suggestion = screen.getByTestId('typography-body2');
    
    expect(cardContent).toContainElement(suggestion);
  });

  it('should render title before suggestion', () => {
    render(<ProductListEmpty />);
    
    const title = screen.getByTestId('typography-h6');
    const suggestion = screen.getByTestId('typography-body2');
    
    expect(title.compareDocumentPosition(suggestion)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('should have correct text content', () => {
    render(<ProductListEmpty />);
    
    expect(screen.getByText('Nenhum produto encontrado')).toHaveTextContent('Nenhum produto encontrado');
    expect(screen.getByText('Tente novamente mais tarde')).toHaveTextContent('Tente novamente mais tarde');
  });

  it('should not render any buttons', () => {
    render(<ProductListEmpty />);
    
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  it('should not render any links', () => {
    render(<ProductListEmpty />);
    
    const links = document.querySelectorAll('a');
    expect(links.length).toBe(0);
  });

  it('should have consistent structure', () => {
    render(<ProductListEmpty />);
    
    const card = screen.getByTestId('card');
    const cardContent = screen.getByTestId('card-content');
    const title = screen.getByTestId('typography-h6');
    const suggestion = screen.getByTestId('typography-body2');
    
    expect(card).toContainElement(cardContent);
    expect(cardContent).toContainElement(title);
    expect(cardContent).toContainElement(suggestion);
  });
});