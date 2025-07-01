import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import type { ReactNode } from 'react';

interface BaseCardProps extends Omit<AntCardProps, 'title'> {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export default function BaseCard({ 
  children, 
  className = '', 
  title, 
  header, 
  footer,
  ...props 
}: BaseCardProps) {
  return (
    <AntCard
      title={title}
      className={`shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
      extra={header}
      {...props}
    >
      {children}
      {footer && <div className="mt-4">{footer}</div>}
    </AntCard>
  );
} 