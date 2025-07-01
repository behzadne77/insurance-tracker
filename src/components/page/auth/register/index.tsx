"use client";

import React from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import Link from 'next/link';
import BaseCard from '@/components/base/card';

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function RegisterPage() {
  const onFinish = async (values: RegisterFormData) => {
    try {
      console.log('Register values:', values);
      // TODO: Implement register logic
      message.success('ثبت‌نام موفقیت‌آمیز بود!');
    } catch (error) {
      message.error('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
    }
  };

  const handleGoogleRegister = () => {
    message.info('ثبت‌نام با گوگل در حال توسعه...');
  };

  const handleGithubRegister = () => {
    message.info('ثبت‌نام با گیت‌هاب در حال توسعه...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <BaseCard className="shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <UserOutlined className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ثبت‌نام</h2>
            <p className="text-gray-600">حساب کاربری جدید ایجاد کنید</p>
          </div>

          {/* Register Form */}
          <Form
            name="register"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="fullName"
              label="نام و نام خانوادگی"
              rules={[
                { required: true, message: 'لطفاً نام و نام خانوادگی خود را وارد کنید' },
                { min: 3, message: 'نام باید حداقل ۳ کاراکتر باشد' }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="نام و نام خانوادگی"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="ایمیل"
              rules={[
                { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
                { type: 'email', message: 'لطفاً ایمیل معتبر وارد کنید' }
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="example@email.com"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="شماره موبایل"
              rules={[
                { required: true, message: 'لطفاً شماره موبایل خود را وارد کنید' },
                { pattern: /^09\d{9}$/, message: 'لطفاً شماره موبایل معتبر وارد کنید' }
              ]}
            >
              <Input 
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="09123456789"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="رمز عبور"
              rules={[
                { required: true, message: 'لطفاً رمز عبور خود را وارد کنید' },
                { min: 8, message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' },
                { 
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
                  message: 'رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد' 
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="رمز عبور خود را وارد کنید"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="تکرار رمز عبور"
              dependencies={['password']}
              rules={[
                { required: true, message: 'لطفاً رمز عبور خود را تکرار کنید' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('رمز عبور و تکرار آن یکسان نیستند'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="رمز عبور خود را تکرار کنید"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="agreeToTerms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('لطفاً قوانین و شرایط را بپذیرید')),
                },
              ]}
            >
              <Checkbox>
                <span className="text-sm">
                  <Link href="/terms" className="text-primary hover:text-primary/80">
                    قوانین و شرایط
                  </Link>
                  {' '}و{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/80">
                    حریم خصوصی
                  </Link>
                  {' '}را می‌پذیرم
                </span>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full h-12 rounded-lg font-medium"
              >
                ثبت‌نام
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <Divider className="my-6">
            <span className="text-gray-500">یا</span>
          </Divider>

          {/* Social Register */}
          <div className="space-y-3">
            <Button 
              icon={<GoogleOutlined />} 
              className="w-full h-12 rounded-lg border-gray-300 hover:border-primary"
              onClick={handleGoogleRegister}
            >
              ثبت‌نام با گوگل
            </Button>
            <Button 
              icon={<GithubOutlined />} 
              className="w-full h-12 rounded-lg border-gray-300 hover:border-primary"
              onClick={handleGithubRegister}
            >
              ثبت‌نام با گیت‌هاب
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              قبلاً حساب کاربری دارید؟{' '}
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
                وارد شوید
              </Link>
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  );
} 