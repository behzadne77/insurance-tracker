import React from 'react';
import { BellOutlined, HomeOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function BaseHeader() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <BellOutlined className="text-2xl text-primary" />
          <h1 className="m-0 text-primary text-xl font-bold">یادآور بیمه</h1>
        </div>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-primary font-medium flex items-center gap-2">
            <HomeOutlined /> خانه
          </Link>
          <Link href="/reminders" className="text-gray-700 hover:text-primary font-medium flex items-center gap-2">
            <FileTextOutlined /> یادآوری‌ها
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-primary font-medium flex items-center gap-2">
            <UserOutlined /> پروفایل
          </Link>
        </nav>
      </div>
    </header>
  );
} 