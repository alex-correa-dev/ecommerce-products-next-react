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
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
      type={type}
      startIcon={startIcon}
      endIcon={endIcon}
      href={href}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
}
