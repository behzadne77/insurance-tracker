import React from 'react';
import { UserOutlined, FileTextOutlined, LikeOutlined } from '@ant-design/icons';
import BaseHeader from '@/components/base/header';
import BaseCard from '@/components/base/card';
import BaseButton from '@/components/base/button';

export default function HomePage() {
  return (
    <>
      <BaseHeader />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            مدیریت هوشمند <span className="text-primary">بیمه‌های شخصی</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            دیگر نگران فراموش کردن تاریخ انقضای بیمه‌هایتان نباشید. با یادآور بیمه، تمام بیمه‌های خود را در یک مکان مدیریت کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <BaseButton size="large">افزودن یادآوری جدید</BaseButton>
            <BaseButton variant="outline" size="large">مشاهده یادآوری‌ها</BaseButton>
          </div>
        </section>
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BaseCard>
              <div className="text-center">
                <UserOutlined className="text-3xl text-primary mb-4" />
                <h3 className="text-2xl font-bold text-primary my-2">۵۰۰+</h3>
                <p className="text-gray-600 m-0">کاربر فعال</p>
              </div>
            </BaseCard>
            <BaseCard>
              <div className="text-center">
                <FileTextOutlined className="text-3xl text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-green-600 my-2">۱۰۰۰+</h3>
                <p className="text-gray-600 m-0">یادآوری ثبت شده</p>
              </div>
            </BaseCard>
            <BaseCard>
              <div className="text-center">
                <LikeOutlined className="text-3xl text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold text-yellow-500 my-2">۹۹٪</h3>
                <p className="text-gray-600 m-0">رضایت کاربران</p>
              </div>
            </BaseCard>
          </div>
        </section>
      </main>
    </>
  );
} 