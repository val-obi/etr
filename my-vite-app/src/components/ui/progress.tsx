import React from 'react';

export const Progress: React.FC<{ value: number, className?: string }> = ({ value, className }) => (
  <progress className={`progress ${className}`} value={value} max="100" />
);