import { render, screen, fireEvent } from '@testing-library/react';
import { ProductError } from './ProductError';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

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

jest.mock('@mui/material/Typography', () => {
  return function MockTypography({ children, variant }: any) {
    return <div data-testid={`typography-${variant}`}>{children}</div>;
  };
});

jest.mock('@mui/material/Button', () => {
  return function MockButton({ children, onClick }: any) {
    return (
      <button data-testid={`button-${children.toLowerCase().replace(/\s/g, '-')}`} onClick={onClick}>
        {children}
      </button>
    );
  };
});

describe('ProductError', () => {
  const mockBack = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      refresh: mockRefresh,
    });
  });

  it('should render error title', () => {
    const error = new Error('Failed to fetch product');
    render(<ProductError error={error} />);
    
    expect(screen.getByText('Erro ao carregar produto')).toBeInTheDocument();
  });

  it('should render error message', () => {
    const error = new Error('Failed to fetch product');
    render(<ProductError error={error} />);
    
    expect(screen.getByText('Failed to fetch product')).toBeInTheDocument();
  });

  it('should render both buttons', () => {
    const error = new Error('Failed to fetch product');
    render(<ProductError error={error} />);
    
    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
  });

  it('should call router.back when clicking Voltar button', () => {
    const error = new Error('Failed to fetch product');
    render(<ProductError error={error} />);
    
    const backButton = screen.getByText('Voltar');
    fireEvent.click(backButton);
    
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('should call router.refresh when clicking Tentar novamente button', () => {
    const error = new Error('Failed to fetch product');
    render(<ProductError error={error} />);
    
    const retryButton = screen.getByText('Tentar novamente');
    fireEvent.click(retryButton);
    
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('should display different error messages', () => {
    const networkError = new Error('Network error');
    const serverError = new Error('Server error: 500');
    const timeoutError = new Error('Request timeout');
    
    const { rerender } = render(<ProductError error={networkError} />);
    expect(screen.getByText('Network error')).toBeInTheDocument();
    
    rerender(<ProductError error={serverError} />);
    expect(screen.getByText('Server error: 500')).toBeInTheDocument();
    
    rerender(<ProductError error={timeoutError} />);
    expect(screen.getByText('Request timeout')).toBeInTheDocument();
  });

  it('should handle error with long message', () => {
    const longErrorMessage = new Error('This is a very long error message that should still be displayed properly');
    render(<ProductError error={longErrorMessage} />);
    
    expect(screen.getByText(longErrorMessage.message)).toBeInTheDocument();
  });

  it('should render both buttons even with empty error message', () => {
    const emptyError = new Error('');
    render(<ProductError error={emptyError} />);
    
    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
  });

  it('should render card and card content structure', () => {
    const error = new Error('Failed to fetch product');
    render(<ProductError error={error} />);
    
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('should render title with h6 variant', () => {
    const error = new Error('Failed to fetch product');
    render(<ProductError error={error} />);
    
    const title = screen.getByTestId('typography-h6');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Erro ao carregar produto');
  });

  it('should render error message with body2 variant', () => {
    const error = new Error('Failed to fetch product');
    render(<ProductError error={error} />);
    
    const errorMessage = screen.getByTestId('typography-body2');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Failed to fetch product');
  });
});