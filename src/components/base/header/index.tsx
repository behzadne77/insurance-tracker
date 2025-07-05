"use client";
import React from 'react';
import { BellOutlined, HomeOutlined, UserOutlined, FileTextOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button, Dropdown } from 'antd';
import { useAuth } from '@/hooks/useAuth';

export default function BaseHeader() {
  const { user, isAuthenticated, logout } = useAuth();

  const userMenuItems = [
    {
      key: 'profile',
      label: <Link href="/profile">پروفایل</Link>,
      icon: <UserOutlined />
    },
    {
      key: 'logout',
      label: 'خروج',
      icon: <LogoutOutlined />,
      onClick: logout
    }
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <BellOutlined className="text-2xl text-primary" />
          <h1 className="m-0 text-primary text-xl font-bold">یادآور بیمه</h1>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-primary font-medium flex items-center gap-2">
            <HomeOutlined /> خانه
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/reminders" className="text-gray-700 hover:text-primary font-medium flex items-center gap-2">
                <FileTextOutlined /> یادآوری‌ها
              </Link>
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button type="text" className="flex items-center gap-2">
                  <UserOutlined />
                  {user?.fullName}
                </Button>
              </Dropdown>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button type="text" icon={<LoginOutlined />}>
                  ورود
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button type="primary" icon={<UserAddOutlined />}>
                  ثبت‌نام
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
} 