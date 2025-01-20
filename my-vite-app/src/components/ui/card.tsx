import React, { ReactNode } from 'react';

export const Card: React.FC<{ className?: string; children: ReactNode }> = ({ className, children }) => <div className={`card ${className}`}>{children}</div>;
export const CardContent: React.FC<{ className?: string; children: ReactNode }> = ({ className, children }) => <div className={`card-content ${className}`}>{children}</div>;
export const CardHeader: React.FC<{ className?: string; children: ReactNode }> = ({ className, children }) => <div className={`card-header ${className}`}>{children}</div>;
export const CardTitle: React.FC<{ className?: string; children: ReactNode }> = ({ className, children }) => <h2 className={`card-title ${className}`}>{children}</h2>;