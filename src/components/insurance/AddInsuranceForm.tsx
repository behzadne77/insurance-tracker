"use client";
import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, Card, Divider } from 'antd';
import { PlusOutlined, } from '@ant-design/icons';
import { CreateInsuranceData, PaymentType, InsuranceType } from '@/types/insurance';
import { authMessages } from '@/utils/messages';
import type { Dayjs } from 'dayjs';

interface AddInsuranceFormProps {
  onSubmit: (data: CreateInsuranceData) => void;
  loading?: boolean;
}

interface FormValues {
  name: string;
  type: InsuranceType;
  startDate: Dayjs;
  endDate: Dayjs;
  paymentType: PaymentType;
  totalAmount: number;
  numberOfInstallments?: number;
  amountPerInstallment?: number;
  installmentStartDate?: Dayjs;
}

const { Option } = Select;

export default function AddInsuranceForm({ onSubmit, loading = false }: AddInsuranceFormProps) {
  const [form] = Form.useForm();
  const [paymentType, setPaymentType] = useState<PaymentType>('lump');

  const handleSubmit = (values: FormValues) => {
    const formData: CreateInsuranceData = {
      name: values.name,
      type: values.type,
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate.format('YYYY-MM-DD'),
      paymentType: values.paymentType,
      totalAmount: values.totalAmount,
      installments: values.paymentType === 'installment' && values.numberOfInstallments && values.amountPerInstallment && values.installmentStartDate ? {
        numberOfInstallments: values.numberOfInstallments,
        amountPerInstallment: values.amountPerInstallment,
        startDate: values.installmentStartDate.format('YYYY-MM-DD')
      } : undefined
    };

    onSubmit(formData);
    form.resetFields();
  };

  const calculateInstallmentAmount = () => {
    const totalAmount = form.getFieldValue('totalAmount');
    const numberOfInstallments = form.getFieldValue('numberOfInstallments');
    
    if (totalAmount && numberOfInstallments) {
      const amountPerInstallment = Math.ceil(totalAmount / numberOfInstallments);
      form.setFieldsValue({ amountPerInstallment });
    }
  };

  return (
    <Card 
      title={
        <div className="flex items-center gap-2">
          <PlusOutlined />
          <span>{authMessages.insurance.addNew}</span>
        </div>
      }
      className="mb-6"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          paymentType: 'lump'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* نام بیمه */}
          <Form.Item
            name="name"
            label={authMessages.insurance.form.name.label}
            rules={[
              { required: true, message: authMessages.insurance.form.name.required }
            ]}
          >
            <Input 
              placeholder={authMessages.insurance.form.name.placeholder}
              className="rounded-lg"
            />
          </Form.Item>

          {/* نوع بیمه */}
          <Form.Item
            name="type"
            label={authMessages.insurance.form.type.label}
            rules={[
              { required: true, message: authMessages.insurance.form.type.required }
            ]}
          >
            <Select 
              placeholder={authMessages.insurance.form.type.placeholder}
              className="rounded-lg"
            >
              <Option value="car">{authMessages.insurance.types.car}</Option>
              <Option value="life">{authMessages.insurance.types.life}</Option>
              <Option value="home">{authMessages.insurance.types.home}</Option>
              <Option value="health">{authMessages.insurance.types.health}</Option>
              <Option value="travel">{authMessages.insurance.types.travel}</Option>
              <Option value="business">{authMessages.insurance.types.business}</Option>
              <Option value="other">{authMessages.insurance.types.other}</Option>
            </Select>
          </Form.Item>

          {/* تاریخ شروع */}
          <Form.Item
            name="startDate"
            label={authMessages.insurance.form.startDate.label}
            rules={[
              { required: true, message: authMessages.insurance.form.startDate.required }
            ]}
          >
            <DatePicker 
              className="w-full rounded-lg"
              format="YYYY/MM/DD"
              placeholder="انتخاب تاریخ شروع"
            />
          </Form.Item>

          {/* تاریخ پایان */}
          <Form.Item
            name="endDate"
            label={authMessages.insurance.form.endDate.label}
            rules={[
              { required: true, message: authMessages.insurance.form.endDate.required }
            ]}
          >
            <DatePicker 
              className="w-full rounded-lg"
              format="YYYY/MM/DD"
              placeholder="انتخاب تاریخ پایان"
            />
          </Form.Item>

          {/* نوع پرداخت */}
          <Form.Item
            name="paymentType"
            label={authMessages.insurance.form.paymentType.label}
            rules={[
              { required: true, message: 'لطفاً نوع پرداخت را انتخاب کنید' }
            ]}
          >
            <Select 
              className="rounded-lg"
              onChange={(value) => setPaymentType(value)}
            >
              <Option value="lump">{authMessages.insurance.form.paymentType.lump}</Option>
              <Option value="installment">{authMessages.insurance.form.paymentType.installment}</Option>
            </Select>
          </Form.Item>

          {/* مبلغ کل */}
          <Form.Item
            name="totalAmount"
            label={authMessages.insurance.form.totalAmount.label}
            rules={[
              { required: true, message: authMessages.insurance.form.totalAmount.required }
            ]}
          >
            <InputNumber
              className="w-full rounded-lg"
              placeholder={authMessages.insurance.form.totalAmount.placeholder}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              min={0}
              addonAfter="تومان"
            />
          </Form.Item>
        </div>

        {/* بخش اقساط */}
        {paymentType === 'installment' && (
          <>
            <Divider>اطلاعات اقساط</Divider>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* تعداد اقساط */}
              <Form.Item
                name="numberOfInstallments"
                label={authMessages.insurance.form.installments.numberOfInstallments.label}
                rules={[
                  { required: true, message: authMessages.insurance.form.installments.numberOfInstallments.required }
                ]}
              >
                <InputNumber
                  className="w-full rounded-lg"
                  placeholder={authMessages.insurance.form.installments.numberOfInstallments.placeholder}
                  min={1}
                  max={60}
                  onChange={calculateInstallmentAmount}
                />
              </Form.Item>

              {/* مبلغ هر قسط */}
              <Form.Item
                name="amountPerInstallment"
                label={authMessages.insurance.form.installments.amountPerInstallment.label}
                rules={[
                  { required: true, message: authMessages.insurance.form.installments.amountPerInstallment.required }
                ]}
              >
                <InputNumber
                  className="w-full rounded-lg"
                  placeholder={authMessages.insurance.form.installments.amountPerInstallment.placeholder}
                  min={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  addonAfter="تومان"
                />
              </Form.Item>

              {/* تاریخ شروع اقساط */}
              <Form.Item
                name="installmentStartDate"
                label={authMessages.insurance.form.installments.startDate.label}
                rules={[
                  { required: true, message: authMessages.insurance.form.installments.startDate.required }
                ]}
              >
                <DatePicker 
                  className="w-full rounded-lg"
                  format="YYYY/MM/DD"
                  placeholder="انتخاب تاریخ شروع اقساط"
                />
              </Form.Item>
            </div>
          </>
        )}

        <Form.Item className="mb-0">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="w-full h-12 rounded-lg font-medium"
            icon={<PlusOutlined />}
          >
            {authMessages.insurance.actions.add}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
} 