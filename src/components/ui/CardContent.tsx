import MuiCardContent from '@mui/material/CardContent';
import { ReactNode } from 'react';

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <MuiCardContent className={className}>
      {children}
    </MuiCardContent>
  );
}
