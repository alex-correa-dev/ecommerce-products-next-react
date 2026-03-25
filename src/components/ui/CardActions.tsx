import MuiCardActions from '@mui/material/CardActions';
import { ReactNode } from 'react';

export interface CardActionsProps {
  children: ReactNode;
  className?: string;
  disableSpacing?: boolean;
}

export function CardActions({ 
  children, 
  className,
  disableSpacing = false,
}: CardActionsProps) {
  return (
    <MuiCardActions
      className={className}
      disableSpacing={disableSpacing}
    >
      {children}
    </MuiCardActions>
  );
}
