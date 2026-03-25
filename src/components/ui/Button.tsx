import MuiButton from '@mui/material/Button';
import { ReactNode } from 'react';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  href?: string;
  component?: React.ElementType;
}

export function Button({ 
  children, 
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  className,
  type = 'button',
  startIcon,
  endIcon,
  href,
  component,
}: ButtonProps) {
  const props: any = {
    variant,
    color,
    size,
    disabled,
    fullWidth,
    className,
    type,
    startIcon,
    endIcon,
  };

  if (onClick) {
    props.onClick = onClick;
  }

  if (href) {
    props.href = href;
  }

  if (component) {
    props.component = component;
  }

  return (
    <MuiButton {...props}>
      {children}
    </MuiButton>
  );
}