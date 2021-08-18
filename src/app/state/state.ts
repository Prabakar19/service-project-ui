import { Category } from '../models/category';
import { Customer } from '../models/customer';
import { ServiceProvider } from '../models/service-provider';
import { dashBoardReducer } from '../routes/customer-dashboard/state/customer-dashboard.reducer';
import { environmentReducer } from '../routes/auth/state/auth.reducer';
import { sharedReducer } from './shared/shared.reducer';
import { Service } from '../models/service';
import { listServiceReducer } from '../routes/list-services/state/list-services.reducer';
import { cartReducer } from '../routes/cart/state/cart.reducer';
import { Billing } from '../models/billing';

export interface DashboardState {
  category: Category[];
  filteredCategoryNames: string[];
  cities: string[];
}

export interface ListServices {
  selectedCategory: Category;
  serviceList: Service[];
  serviceProvider: ServiceProvider;
  service: Service;
}
export interface CartView {
  cartList: Service[];
  billing: Billing;
}

export interface EnvironmentState {
  customer: Customer;
  serviceProvider: ServiceProvider;
}

export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
}

export interface AppState {
  dashboard: DashboardState;
  listServices: ListServices;
  cart: CartView;
  environment: EnvironmentState;
  shared: SharedState;
}

export const appReducer = {
  dashboard: dashBoardReducer,
  listServices: listServiceReducer,
  cart: cartReducer,
  environment: environmentReducer,
  shared: sharedReducer,
};
