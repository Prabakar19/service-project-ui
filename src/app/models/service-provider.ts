import { Service } from './service';
import { Billing } from './billing';

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
  address: {
    addressId: number;
    addresLine: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
  };
  serviceAddressId: number;
}
