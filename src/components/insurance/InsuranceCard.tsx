"use client";
import React from 'react';
import { Card, Tag, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import { Insurance } from '@/types/insurance';
import { authMessages } from '@/utils/messages';

interface InsuranceCardProps {
  insurance: Insurance;
  onEdit: (insurance: Insurance) => void;
  onDelete: (id: string) => void;
  onView: (insurance: Insurance) => void;
}

const getInsuranceTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    car: 'blue',
    life: 'green',
    home: 'orange',
    health: 'red',
    travel: 'purple',
    business: 'cyan',
    other: 'default'
  };
  return colors[type] || 'default';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fa-IR');
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
};

export default function InsuranceCard({ insurance, onEdit, onDelete, onView }: InsuranceCardProps) {
  const isExpired = new Date(insurance.endDate) < new Date();
  const isExpiringSoon = () => {
    const endDate = new Date(insurance.endDate);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <Card
      className="mb-4 hover:shadow-lg transition-shadow"
      actions={[
        <Tooltip title="مشاهده جزئیات" key={insurance.id}>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => onView(insurance)}
          />
        </Tooltip>,
        <Tooltip title="ویرایش" key={insurance.id}>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(insurance)}
          />
        </Tooltip>,
        <Tooltip title="حذف" key={insurance.id}>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(insurance.id)}
          />
        </Tooltip>
      ]}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{insurance.name}</h3>
          <Tag color={getInsuranceTypeColor(insurance.type)} className="mb-2">
            {authMessages.insurance.types[insurance.type as keyof typeof authMessages.insurance.types]}
          </Tag>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">
            {formatCurrency(insurance.totalAmount)}
          </div>
          <Tag color={insurance.paymentType === 'lump' ? 'green' : 'orange'}>
            {insurance.paymentType === 'lump' 
              ? authMessages.insurance.form.paymentType.lump 
              : authMessages.insurance.form.paymentType.installment
            }
          </Tag>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CalendarOutlined />
          <span>شروع: {formatDate(insurance.startDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarOutlined />
          <span>پایان: {formatDate(insurance.endDate)}</span>
        </div>
        
        {insurance.paymentType === 'installment' && insurance.installments && (
          <div className="flex items-center gap-2">
            <DollarOutlined />
            <span>
              {insurance.installments.paidInstallments} از {insurance.installments.numberOfInstallments} قسط پرداخت شده
            </span>
          </div>
        )}
      </div>

      <div className="mt-3">
        {isExpired ? (
          <Tag color="red">منقضی شده</Tag>
        ) : isExpiringSoon() ? (
          <Tag color="orange">به زودی منقضی می‌شود</Tag>
        ) : (
          <Tag color="green">فعال</Tag>
        )}
      </div>
    </Card>
  );
} 