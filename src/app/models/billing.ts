import { Transaction } from './transaction';

export interface Billing {
  billingId: number;
  cost: number;
  gst: number;
  totalCost: number;
  originalCost: number;
  customerId: number;
  serviceProviderId: number;
  transactions: Transaction[];
}
