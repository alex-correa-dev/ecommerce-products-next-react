import MuiSkeleton from '@mui/material/Skeleton';

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: number | string;
  height?: number | string;
  className?: string;
  animation?: 'pulse' | 'wave' | false;
}

export function Skeleton({ 
  variant = 'text', 
  width, 
  height, 
  className,
  animation = 'pulse'
}: SkeletonProps) {
  return (
    <MuiSkeleton
      variant={variant}
      width={width}
      height={height}
      className={className}
      animation={animation}
    />
  );
}