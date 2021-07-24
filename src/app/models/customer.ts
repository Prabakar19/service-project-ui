import { Address } from './address';

export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNum: string;
  password: string;
  address?: Address;
  customerPic?: any;
}
