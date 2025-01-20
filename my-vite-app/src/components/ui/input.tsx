import React from 'react';

export const Input: React.FC<{ placeholder?: string, type?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, className?: string, readOnly?: boolean }> = (props) => (
  <input className={`input ${props.className}`} {...props} />
);