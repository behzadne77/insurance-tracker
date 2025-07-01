"use client";
import React from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import Link from 'next/link';
import BaseCard from '@/components/base/card';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const onFinish = async (values: LoginFormData) => {
    try {
      console.log('Login values:', values);
      // TODO: Implement login logic
      message.success('ورود موفقیت‌آمیز بود!');
    } catch (error) {
      message.error('خطا در ورود. لطفاً دوباره تلاش کنید.');
    }
  };

  const handleGoogleLogin = () => {
    message.info('ورود با گوگل در حال توسعه...');
  };

  const handleGithubLogin = () => {
    message.info('ورود با گیت‌هاب در حال توسعه...');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">خوش آمدید</h2>
            <p className="text-gray-600">لطفاً برای ادامه وارد حساب کاربری خود شوید</p>
          </div>

          {/* Login Form */}
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="ایمیل"
              rules={[
                { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
                { type: 'email', message: 'لطفاً ایمیل معتبر وارد کنید' }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="example@email.com"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="رمز عبور"
              rules={[
                { required: true, message: 'لطفاً رمز عبور خود را وارد کنید' },
                { min: 6, message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="رمز عبور خود را وارد کنید"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>مرا به خاطر بسپار</Checkbox>
                </Form.Item>
                <Link href="/auth/forgot-password" className="text-primary hover:text-primary/80">
                  فراموشی رمز عبور؟
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full h-12 rounded-lg font-medium"
              >
                ورود
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <Divider className="my-6">
            <span className="text-gray-500">یا</span>
          </Divider>

          {/* Social Login */}
          <div className="space-y-3">
            <Button 
              icon={<GoogleOutlined />} 
              className="w-full h-12 rounded-lg border-gray-300 hover:border-primary"
              onClick={handleGoogleLogin}
            >
              ورود با گوگل
            </Button>
            <Button 
              icon={<GithubOutlined />} 
              className="w-full h-12 rounded-lg border-gray-300 hover:border-primary"
              onClick={handleGithubLogin}
            >
              ورود با گیت‌هاب
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              حساب کاربری ندارید؟{' '}
              <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium">
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  );
} 