import MuiCardMedia from '@mui/material/CardMedia';
import { ReactNode } from 'react';

export interface CardMediaProps {
  children?: ReactNode;
  className?: string;
  component?: React.ElementType;
  image?: string;
  title?: string;
}

export function CardMedia({ 
  children, 
  className,
  component = 'div',
  image,
  title,
}: CardMediaProps) {
  return (
    <MuiCardMedia
      className={className}
      component={component}
      image={image}
      title={title}
    >
      {children}
    </MuiCardMedia>
  );
}
