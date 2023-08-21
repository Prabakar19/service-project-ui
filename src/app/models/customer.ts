import { Address } from './address';

export interface Customer {
  customerId: string;
  customerName: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNum: string;
  password: string;
  // address?: Address;
  customerPic?: any;
}
