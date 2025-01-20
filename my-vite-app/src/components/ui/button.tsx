import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
  className?: string;
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, size, className, children, ...props }) => (
  <button className={`button ${variant} ${size} ${className}`} {...props}>
    {children}
  </button>
);