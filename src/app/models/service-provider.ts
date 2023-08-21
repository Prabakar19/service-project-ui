import { Service } from './service';
import { Billing } from './billing';
import { Address } from './address';

export interface ServiceProvider {
  serviceProviderId: string;
  companyName: string;
  ownerName: string;
  emailId: string;
  phoneNum: string;
  password: string;
  spRating: number;
  // serviceProviderPic: string;
  // services: Service[];
  // billings: Array<Billing>;
  // serviceAddress: Address;
  // serviceAddressId: number;
}
