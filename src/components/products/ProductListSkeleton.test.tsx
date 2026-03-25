import { render, screen } from '@testing-library/react';
import { ProductListSkeleton } from './ProductListSkeleton';

jest.mock('@mui/material/Card', () => {
  return function MockCard({ children, className }: any) {
    return <div data-testid="card" className={className}>{children}</div>;
  };
});

jest.mock('@mui/material/CardContent', () => {
  return function MockCardContent({ children }: any) {
    return <div data-testid="card-content">{children}</div>;
  };
});

jest.mock('@mui/material/Skeleton', () => {
  return function MockSkeleton({ variant, height, width, className }: any) {
    return (
      <div 
        data-testid={`skeleton-${variant}`} 
        data-height={height}
        data-width={width}
        className={className}
      />
    );
  };
});

describe('ProductListSkeleton', () => {
  it('should render 8 skeleton cards', () => {
    render(<ProductListSkeleton />);
    
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(8);
  });

  it('should render skeleton with rectangular variant for image', () => {
    render(<ProductListSkeleton />);
    
    const rectangularSkeletons = screen.getAllByTestId('skeleton-rectangular');
    expect(rectangularSkeletons).toHaveLength(8);
    
    rectangularSkeletons.forEach(skeleton => {
      expect(skeleton).toHaveAttribute('data-height', '200');
    });
  });

  it('should render skeleton with text variant for title', () => {
    render(<ProductListSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    expect(textSkeletons.length).toBeGreaterThanOrEqual(16);
  });

  it('should have 3 text skeletons per card', () => {
    render(<ProductListSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    expect(textSkeletons).toHaveLength(24);
  });

  it('should render card content for each skeleton', () => {
    render(<ProductListSkeleton />);
    
    const cardContents = screen.getAllByTestId('card-content');
    expect(cardContents).toHaveLength(8);
  });

  it('should render all cards with unique keys', () => {
    render(<ProductListSkeleton />);
    
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(8);
    
    const cardContents = screen.getAllByTestId('card-content');
    expect(cardContents.length).toBe(8);
  });

  it('should have consistent structure across all cards', () => {
    render(<ProductListSkeleton />);
    
    const cards = screen.getAllByTestId('card');
    
    cards.forEach(card => {
      const rectangularSkeleton = card.querySelector('[data-testid="skeleton-rectangular"]');
      const cardContent = card.querySelector('[data-testid="card-content"]');
      const textSkeletons = card.querySelectorAll('[data-testid="skeleton-text"]');
      
      expect(rectangularSkeleton).toBeInTheDocument();
      expect(cardContent).toBeInTheDocument();
      expect(textSkeletons).toHaveLength(3);
    });
  });

  it('should render exactly 24 text skeletons total (8 cards * 3)', () => {
    render(<ProductListSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    expect(textSkeletons).toHaveLength(24);
  });

  it('should render exactly 8 rectangular skeletons', () => {
    render(<ProductListSkeleton />);
    
    const rectangularSkeletons = screen.getAllByTestId('skeleton-rectangular');
    expect(rectangularSkeletons).toHaveLength(8);
  });

  it('should have correct total number of elements', () => {
    render(<ProductListSkeleton />);
    
    const cards = screen.getAllByTestId('card');
    const cardContents = screen.getAllByTestId('card-content');
    const rectangularSkeletons = screen.getAllByTestId('skeleton-rectangular');
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    
    expect(cards.length).toBe(8);
    expect(cardContents.length).toBe(8);
    expect(rectangularSkeletons.length).toBe(8);
    expect(textSkeletons.length).toBe(24);
  });
});