export interface Insurance {
  id: string;
  name: string;
  type: InsuranceType;
  startDate: string;
  endDate: string;
  paymentType: PaymentType;
  totalAmount: number;
  installments?: InstallmentInfo;
  createdAt: string;
  updatedAt: string;
}

export type InsuranceType = 
  | 'car' 
  | 'life' 
  | 'home' 
  | 'health' 
  | 'travel' 
  | 'business' 
  | 'other';

export type PaymentType = 'lump' | 'installment';

export interface InstallmentInfo {
  numberOfInstallments: number;
  amountPerInstallment: number;
  startDate: string;
  nextPaymentDate: string;
  paidInstallments: number;
}

export interface CreateInsuranceData {
  name: string;
  type: InsuranceType;
  startDate: string;
  endDate: string;
  paymentType: PaymentType;
  totalAmount: number;
  installments?: {
    numberOfInstallments: number;
    amountPerInstallment: number;
    startDate: string;
  };
} 