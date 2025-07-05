import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import type { ReactNode } from 'react';

interface BaseButtonProps extends AntButtonProps {
  children: ReactNode;
  className?: string;
}

export default function BaseButton({
  children,
  className = '',
  ...props
}: BaseButtonProps) {
  return (
    <AntButton
      className={className}
      {...props}
    >
      {children}
    </AntButton>
  );
} 