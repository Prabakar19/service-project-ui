import { Service } from './service';

export interface Cart {
  serviceProviderId: number;
  services: Service[];
}
