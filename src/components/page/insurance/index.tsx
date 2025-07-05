"use client";
import React, { useState, useEffect } from 'react';
import { Button, Empty, Modal, message, Space, Typography } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import BaseHeader from '@/components/base/header';
import InsuranceCard from '@/components/insurance/InsuranceCard';
import AddInsuranceForm from '@/components/insurance/AddInsuranceForm';
import { Insurance, CreateInsuranceData } from '@/types/insurance';
import { authMessages } from '@/utils/messages';

const { Title } = Typography;

export default function InsurancePage() {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Load insurances from localStorage
  useEffect(() => {
    loadInsurances();
  }, []);

  const loadInsurances = () => {
    try {
      const savedInsurances = localStorage.getItem('insurances');
      if (savedInsurances) {
        setInsurances(JSON.parse(savedInsurances));
      }
    } catch (error) {
      console.error('Error loading insurances:', error);
    }
  };

  const saveInsurances = (newInsurances: Insurance[]) => {
    try {
      localStorage.setItem('insurances', JSON.stringify(newInsurances));
      setInsurances(newInsurances);
    } catch (error) {
      console.error('Error saving insurances:', error);
    }
  };

  const handleAddInsurance = async (data: CreateInsuranceData) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newInsurance: Insurance = {
        id: Date.now().toString(),
        ...data,
        installments: data.installments ? {
          ...data.installments,
          nextPaymentDate: data.installments.startDate,
          paidInstallments: 0
        } : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedInsurances = [...insurances, newInsurance];
      saveInsurances(updatedInsurances);
      
      message.success(authMessages.insurance.success.added);
      setShowForm(false);
    } catch (error) {
      console.log(error)
      message.error(authMessages.insurance.error.add);
    } finally {
      setLoading(false);
    }
  };

  const handleEditInsurance = (insurance: Insurance) => {
    setSelectedInsurance(insurance);
    setShowForm(true);
  };

  const handleDeleteInsurance = (id: string) => {
    Modal.confirm({
      title: 'حذف بیمه',
      content: 'آیا از حذف این بیمه اطمینان دارید؟',
      okText: 'بله',
      cancelText: 'خیر',
      onOk: () => {
        try {
          const updatedInsurances = insurances.filter(ins => ins.id !== id);
          saveInsurances(updatedInsurances);
          message.success(authMessages.insurance.success.deleted);
        } catch (error) {
          message.error(authMessages.insurance.error.delete);
        }
      }
    });
  };

  const handleViewInsurance = (insurance: Insurance) => {
    Modal.info({
      title: insurance.name,
      content: (
        <div className="space-y-2">
          <p><strong>نوع:</strong> {authMessages.insurance.types[insurance.type]}</p>
          <p><strong>تاریخ شروع:</strong> {new Date(insurance.startDate).toLocaleDateString('fa-IR')}</p>
          <p><strong>تاریخ پایان:</strong> {new Date(insurance.endDate).toLocaleDateString('fa-IR')}</p>
          <p><strong>مبلغ کل:</strong> {new Intl.NumberFormat('fa-IR').format(insurance.totalAmount)} تومان</p>
          <p><strong>نوع پرداخت:</strong> {
            insurance.paymentType === 'lump' 
              ? authMessages.insurance.form.paymentType.lump 
              : authMessages.insurance.form.paymentType.installment
          }</p>
          {insurance.installments && (
            <>
              <p><strong>تعداد اقساط:</strong> {insurance.installments.numberOfInstallments}</p>
              <p><strong>مبلغ هر قسط:</strong> {new Intl.NumberFormat('fa-IR').format(insurance.installments.amountPerInstallment)} تومان</p>
              <p><strong>اقساط پرداخت شده:</strong> {insurance.installments.paidInstallments} از {insurance.installments.numberOfInstallments}</p>
            </>
          )}
        </div>
      ),
      okText: 'بستن'
    });
  };

  return (
    <>
      <BaseHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="mb-0">{authMessages.insurance.title}</Title>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={loadInsurances}
            >
              به‌روزرسانی
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setShowForm(true)}
            >
              {authMessages.insurance.addNew}
            </Button>
          </Space>
        </div>

        {/* Add Insurance Form */}
        {showForm && (
          <AddInsuranceForm 
            onSubmit={handleAddInsurance}
            loading={loading}
          />
        )}

        {/* Insurance List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insurances.length > 0 ? (
            insurances.map((insurance) => (
              <InsuranceCard
                key={insurance.id}
                insurance={insurance}
                onEdit={handleEditInsurance}
                onDelete={handleDeleteInsurance}
                onView={handleViewInsurance}
              />
            ))
          ) : (
            <div className="col-span-full">
              <Empty
                description={
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">{authMessages.insurance.noInsurances}</p>
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />}
                      onClick={() => setShowForm(true)}
                    >
                      {authMessages.insurance.addFirst}
                    </Button>
                  </div>
                }
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
} 