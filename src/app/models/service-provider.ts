import { Service } from './service';
import { Billing } from './billing';
import { Address } from './address';

export interface ServiceProvider {
  serviceProviderId: number;
  companyName: string;
  ownerName: string;
  emailId: string;
  phoneNum: string;
  password: string;
  spRating: number;
  serviceProviderPic: File;
  services: Service[];
  billings: Array<Billing>;
  serviceAddress: Address;
  serviceAddressId: number;
}
