import MuiCard from '@mui/material/Card';
import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  elevation?: number;
  variant?: 'elevation' | 'outlined';
}

export function Card({ children, className, onClick, elevation = 1, variant = 'elevation' }: CardProps) {
  return (
    <MuiCard
      className={className}
      onClick={onClick}
      elevation={elevation}
      variant={variant}
    >
      {children}
    </MuiCard>
  );
}