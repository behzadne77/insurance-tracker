import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import type { ReactNode } from 'react';

interface BaseButtonProps extends Omit<AntButtonProps, 'type'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

export default function BaseButton({
  children,
  variant = 'primary',
  size = 'middle',
  className = '',
  ...props
}: BaseButtonProps) {
  const getButtonType = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'outline':
        return 'default';
      default:
        return 'primary';
    }
  };

  const getButtonStyle = () => {
    if (variant === 'outline') {
      return {
        borderColor: '#1890ff',
        color: '#1890ff',
        backgroundColor: 'transparent',
      };
    }
    return {};
  };

  return (
    <AntButton
      type={getButtonType()}
      size={size}
      className={className}
      style={getButtonStyle()}
      {...props}
    >
      {children}
    </AntButton>
  );
} 