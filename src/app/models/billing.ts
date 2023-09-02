import { Transaction } from './transaction';

export interface Billing {
  billingId: string;
  cost: number;
  gst: number;
  totalCost: number;
  originalCost: number;
  customerId: string;
  serviceProviderId: string;
  transactions: Transaction[];
}
