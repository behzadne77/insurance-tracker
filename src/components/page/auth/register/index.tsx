"use client";

import React from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BaseCard from '@/components/base/card';
import { authMessages } from '@/utils/messages';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading } = useAuth();

  const onFinish = async (values: RegisterFormData) => {
    try {
      const success = await register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password
      });

      if (success) {
        message.success(authMessages.register.success);
        router.push('/');
      } else {
        message.error(authMessages.register.userExists);
      }
    } catch(e) {
      console.log(e)
      message.error(authMessages.register.error);
    }
  };

  const handleGoogleRegister = () => {
    message.info(authMessages.register.googleComingSoon);
  };

  const handleGithubRegister = () => {
    message.info(authMessages.register.githubComingSoon);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{authMessages.register.title}</h2>
            <p className="text-gray-600">{authMessages.register.subtitle}</p>
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
              label={authMessages.register.fullName.label}
              rules={[
                { required: true, message: authMessages.register.fullName.required },
                { min: 3, message: authMessages.register.fullName.minLength }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder={authMessages.register.fullName.placeholder}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={authMessages.register.email.label}
              rules={[
                { required: true, message: authMessages.register.email.required },
                { type: 'email', message: authMessages.register.email.invalid }
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder={authMessages.register.email.placeholder}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={authMessages.register.phone.label}
              rules={[
                { required: true, message: authMessages.register.phone.required },
                { pattern: /^09\d{9}$/, message: authMessages.register.phone.invalid }
              ]}
            >
              <Input 
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder={authMessages.register.phone.placeholder}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={authMessages.register.password.label}
              rules={[
                { required: true, message: authMessages.register.password.required },
                { min: 8, message: authMessages.register.password.minLength },
                { 
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
                  message: authMessages.register.password.pattern 
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={authMessages.register.password.placeholder}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={authMessages.register.confirmPassword.label}
              dependencies={['password']}
              rules={[
                { required: true, message: authMessages.register.confirmPassword.required },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(authMessages.register.confirmPassword.mismatch));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={authMessages.register.confirmPassword.placeholder}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="agreeToTerms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error(authMessages.register.agreeToTerms.required)),
                },
              ]}
            >
              <Checkbox>
                <span className="text-sm">
                  <Link href="/terms" className="text-primary hover:text-primary/80">
                    {authMessages.register.agreeToTerms.text}
                  </Link>
                  {' '}و{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/80">
                    {authMessages.register.agreeToTerms.privacy}
                  </Link>
                  {' '}{authMessages.register.agreeToTerms.accept}
                </span>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="w-full h-12 rounded-lg font-medium"
              >
                {authMessages.register.submitButton}
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <Divider className="my-6">
            <span className="text-gray-500">{authMessages.register.divider}</span>
          </Divider>

          {/* Social Register */}
          <div className="space-y-3">
            <Button 
              icon={<GoogleOutlined />} 
              className="w-full h-12 rounded-lg border-gray-300 hover:border-primary"
              onClick={handleGoogleRegister}
            >
              {authMessages.register.googleRegister}
            </Button>
            <Button 
              icon={<GithubOutlined />} 
              className="w-full h-12 rounded-lg border-gray-300 hover:border-primary"
              onClick={handleGithubRegister}
            >
              {authMessages.register.githubRegister}
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {authMessages.register.hasAccount}{' '}
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
                {authMessages.register.loginLink}
              </Link>
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  );
} 