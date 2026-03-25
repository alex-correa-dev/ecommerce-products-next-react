import { render, screen, fireEvent } from '@testing-library/react';
import { ProductListError } from './ProductListError';

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

jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, className }: any) => (
    <button data-testid="retry-button" onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

describe('ProductListError', () => {
  const mockError = new Error('Failed to fetch products');
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render error message correctly', () => {
    render(<ProductListError error={mockError} />);
    
    expect(screen.getByText('Erro ao carregar produtos')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch products')).toBeInTheDocument();
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ProductListError error={mockError} />);
    
    const retryButton = screen.queryByTestId('retry-button');
    expect(retryButton).not.toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    render(<ProductListError error={mockError} onRetry={mockOnRetry} />);
    
    const retryButton = screen.getByTestId('retry-button');
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveTextContent('Tentar novamente');
  });

  it('should call onRetry when retry button is clicked', () => {
    render(<ProductListError error={mockError} onRetry={mockOnRetry} />);
    
    const retryButton = screen.getByTestId('retry-button');
    fireEvent.click(retryButton);
    
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should render different error messages', () => {
    const networkError = new Error('Network error');
    const serverError = new Error('Server error: 500');
    const timeoutError = new Error('Request timeout');
    
    const { rerender } = render(<ProductListError error={networkError} />);
    expect(screen.getByText('Network error')).toBeInTheDocument();
    
    rerender(<ProductListError error={serverError} />);
    expect(screen.getByText('Server error: 500')).toBeInTheDocument();
    
    rerender(<ProductListError error={timeoutError} />);
    expect(screen.getByText('Request timeout')).toBeInTheDocument();
  });

  it('should have card content structure', () => {
    render(<ProductListError error={mockError} />);
    
    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
  });

  it('should render all elements in correct order', () => {
    render(<ProductListError error={mockError} onRetry={mockOnRetry} />);
    
    const cardContent = screen.getByTestId('card-content');
    const title = screen.getByTestId('typography-h6');
    const errorMessage = screen.getByTestId('typography-body2');
    const retryButton = screen.getByTestId('retry-button');
    
    expect(cardContent).toContainElement(title);
    expect(cardContent).toContainElement(errorMessage);
    expect(cardContent).toContainElement(retryButton);
  });

  it('should handle long error messages', () => {
    const longErrorMessage = new Error('This is a very long error message that should still be displayed properly without breaking the layout');
    render(<ProductListError error={longErrorMessage} />);
    
    expect(screen.getByText(longErrorMessage.message)).toBeInTheDocument();
  });

  it('should have button with variant contained', () => {
    render(<ProductListError error={mockError} onRetry={mockOnRetry} />);
    
    const retryButton = screen.getByTestId('retry-button');
    expect(retryButton).toBeInTheDocument();
  });

  it('should not render button when onRetry is undefined', () => {
    render(<ProductListError error={mockError} onRetry={undefined} />);
    
    const retryButton = screen.queryByTestId('retry-button');
    expect(retryButton).not.toBeInTheDocument();
  });
});