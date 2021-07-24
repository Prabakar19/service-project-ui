export interface Transaction {
  transactionId: number;
  serviceId: number;
  billingId: number;
  customerId: number;
  status: string;
  transactionRating: number;
  transactionAmount: number;
  originalCost: number;
  date: Date;
}

export interface TransDetails {
  transaction: Transaction;
  serviceName: string;
}
