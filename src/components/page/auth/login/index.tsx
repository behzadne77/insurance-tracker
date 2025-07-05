"use client";
import React from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BaseCard from '@/components/base/card';
import { authMessages } from '@/utils/messages';
import { useAuth } from '@/hooks/useAuth';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const onFinish = async (values: LoginFormData) => {
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        message.success(authMessages.login.success);
        router.push('/');
      } else {
        message.error(authMessages.login.error);
      }
    } catch (e) {
      console.log(e)
      message.error(authMessages.login.error);
    }
  };

  const handleGoogleLogin = () => {
    message.info(authMessages.login.googleComingSoon);
  };

  const handleGithubLogin = () => {
    message.info(authMessages.login.githubComingSoon);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{authMessages.login.welcome}</h2>
            <p className="text-gray-600">{authMessages.login.subtitle}</p>
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
              label={authMessages.login.email.label}
              rules={[
                { required: true, message: authMessages.login.email.required },
                { type: 'email', message: authMessages.login.email.invalid }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder={authMessages.login.email.placeholder}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={authMessages.login.password.label}
              rules={[
                { required: true, message: authMessages.login.password.required },
                { min: 6, message: authMessages.login.password.minLength }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={authMessages.login.password.placeholder}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>{authMessages.login.rememberMe}</Checkbox>
                </Form.Item>
                <Link href="/auth/forgot-password" className="text-primary hover:text-primary/80">
                  {authMessages.login.forgotPassword}
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="w-full h-12 rounded-lg font-medium"
              >
                {authMessages.login.submitButton}
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <Divider className="my-6">
            <span className="text-gray-500">{authMessages.login.divider}</span>
          </Divider>

          {/* Social Login */}
          <div className="space-y-3">
            <Button 
              icon={<GoogleOutlined />} 
              className="w-full h-12 rounded-lg border-gray-300 hover:border-primary"
              onClick={handleGoogleLogin}
            >
              {authMessages.login.googleLogin}
            </Button>
            <Button 
              icon={<GithubOutlined />} 
              className="w-full h-12 rounded-lg border-gray-300 hover:border-primary"
              onClick={handleGithubLogin}
            >
              {authMessages.login.githubLogin}
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {authMessages.login.noAccount}{' '}
              <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium">
                {authMessages.login.registerLink}
              </Link>
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  );
} 