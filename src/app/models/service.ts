export interface Service {
  serviceId: string;
  serviceName: string;
  cost: number;
  discountedCost?: number;
  discount: number;
  discountAvailability: boolean;
  shortDescription: string;
  details: string;
  warranty: number;
  serviceProviderId: number;
  categoryId: number;
  rating: number;
  servicePic: string;
  city: string;
}
