import { render, screen } from '@testing-library/react';
import { ProductSkeleton } from './ProductSkeleton';

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

jest.mock('@mui/material/Skeleton', () => {
  return function MockSkeleton({ variant, width, height }: any) {
    return (
      <div data-testid={`skeleton-${variant}`} data-width={width} data-height={height}>
        Loading...
      </div>
    );
  };
});

describe('ProductSkeleton', () => {
  it('should render image skeleton', () => {
    render(<ProductSkeleton />);
    
    const rectangularSkeletons = screen.getAllByTestId('skeleton-rectangular');
    const imageSkeleton = rectangularSkeletons[0];
    expect(imageSkeleton).toBeInTheDocument();
    expect(imageSkeleton).toHaveAttribute('data-height', '100%');
  });

  it('should render title skeleton', () => {
    render(<ProductSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    const titleSkeleton = textSkeletons[0];
    expect(titleSkeleton).toBeInTheDocument();
    expect(titleSkeleton).toHaveAttribute('data-height', '48');
    expect(titleSkeleton).toHaveAttribute('data-width', '80%');
  });

  it('should render rating skeletons', () => {
    render(<ProductSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    const ratingSkeleton1 = textSkeletons[1];
    const ratingSkeleton2 = textSkeletons[2];
    
    expect(ratingSkeleton1).toBeInTheDocument();
    expect(ratingSkeleton1).toHaveAttribute('data-width', '120');
    expect(ratingSkeleton1).toHaveAttribute('data-height', '24');
    
    expect(ratingSkeleton2).toBeInTheDocument();
    expect(ratingSkeleton2).toHaveAttribute('data-width', '80');
    expect(ratingSkeleton2).toHaveAttribute('data-height', '24');
  });

  it('should render category skeleton', () => {
    render(<ProductSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    const categorySkeleton = textSkeletons[3];
    expect(categorySkeleton).toBeInTheDocument();
    expect(categorySkeleton).toHaveAttribute('data-width', '30%');
    expect(categorySkeleton).toHaveAttribute('data-height', '24');
  });

  it('should render price skeleton', () => {
    render(<ProductSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    const priceSkeleton = textSkeletons[4];
    expect(priceSkeleton).toBeInTheDocument();
    expect(priceSkeleton).toHaveAttribute('data-width', '40%');
    expect(priceSkeleton).toHaveAttribute('data-height', '48');
  });

  it('should render description skeleton', () => {
    render(<ProductSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    const descriptionSkeleton = textSkeletons[5];
    expect(descriptionSkeleton).toBeInTheDocument();
    expect(descriptionSkeleton).toHaveAttribute('data-height', '80');
  });

  it('should render additional info card with skeletons', () => {
    render(<ProductSkeleton />);
    
    const card = screen.getByTestId('card');
    const cardContent = screen.getByTestId('card-content');
    const additionalInfoTitle = screen.getAllByTestId('skeleton-text')[6];
    const infoLines = screen.getAllByTestId('skeleton-text').slice(7, 10);
    
    expect(card).toBeInTheDocument();
    expect(cardContent).toBeInTheDocument();
    expect(additionalInfoTitle).toBeInTheDocument();
    expect(additionalInfoTitle).toHaveAttribute('data-width', '50%');
    expect(additionalInfoTitle).toHaveAttribute('data-height', '32');
    
    expect(infoLines).toHaveLength(3);
    infoLines.forEach(line => {
      expect(line).toHaveAttribute('data-width', '100%');
      expect(line).toHaveAttribute('data-height', '20');
    });
  });

  it('should render button skeleton', () => {
    render(<ProductSkeleton />);
    
    const buttonSkeleton = screen.getAllByTestId('skeleton-rectangular')[1];
    expect(buttonSkeleton).toBeInTheDocument();
    expect(buttonSkeleton).toHaveAttribute('data-height', '48');
  });

  it('should render correct number of skeletons', () => {
    render(<ProductSkeleton />);
    
    const rectangularSkeletons = screen.getAllByTestId('skeleton-rectangular');
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    
    expect(rectangularSkeletons).toHaveLength(2);
    expect(textSkeletons).toHaveLength(10);
  });

  it('should render image skeleton with rectangular variant', () => {
    render(<ProductSkeleton />);
    
    const rectangularSkeletons = screen.getAllByTestId('skeleton-rectangular');
    const imageSkeleton = rectangularSkeletons[0];
    expect(imageSkeleton).toBeInTheDocument();
    expect(imageSkeleton).toHaveAttribute('data-height', '100%');
    });

  it('should render button skeleton with rectangular variant', () => {
    render(<ProductSkeleton />);
    
    const buttonSkeleton = screen.getAllByTestId('skeleton-rectangular')[1];
    expect(buttonSkeleton).toBeInTheDocument();
  });

  it('should render all text skeletons with correct variants', () => {
    render(<ProductSkeleton />);
    
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    expect(textSkeletons.length).toBe(10);
    
    textSkeletons.forEach(skeleton => {
      expect(skeleton).toBeInTheDocument();
    });
  });

  it('should render image container', () => {
    render(<ProductSkeleton />);
    
    const imageContainer = document.querySelector('.aspect-square');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should render ratings container', () => {
    render(<ProductSkeleton />);
    
    const ratingsContainer = document.querySelector('.flex.items-center.gap-2');
    expect(ratingsContainer).toBeInTheDocument();
  });

  it('should render info container with spacing', () => {
    render(<ProductSkeleton />);
    
    const infoContainer = document.querySelector('.space-y-3');
    expect(infoContainer).toBeInTheDocument();
  });
});