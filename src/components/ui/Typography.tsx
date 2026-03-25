import MuiTypography from '@mui/material/Typography';
import { ReactNode } from 'react';

export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'subtitle1' 
  | 'subtitle2' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'overline';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  component?: React.ElementType;
  className?: string;
  color?: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
}

export function Typography({ 
  children, 
  variant = 'body1', 
  component,
  className,
  color,
  align,
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
}: TypographyProps) {
  const props: any = {
    variant,
    className,
    color,
    align,
    gutterBottom,
    noWrap,
    paragraph,
  };

  if (component) {
    props.component = component;
  }

  return (
    <MuiTypography {...props}>
      {children}
    </MuiTypography>
  );
}