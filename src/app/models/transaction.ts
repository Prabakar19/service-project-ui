export interface Transaction {
  transactionId: string;
  serviceId: string;
  billingId: string;
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
