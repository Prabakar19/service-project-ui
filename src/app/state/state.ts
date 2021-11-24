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
import { Transaction } from '../models/transaction';
import { bookingReducer } from '../routes/booking/state/booking.reducer';
import { BookingEffects } from '../routes/booking/state/booking.effects';
import { CartEffects } from '../routes/cart/state/cart.effects';
import { ListServiceEffects } from '../routes/list-services/state/list-services.effects';
import { AuthEffects } from '../routes/auth/state/auth.effects';
import { CustomerDashboardEffects } from '../routes/customer-dashboard/state/customer-dashboard.effects';
import { spDashBoardReducer } from '../routes/sp-dashboard/state/sp-dashboard.reducer';
import { SPDashboardEffects } from '../routes/sp-dashboard/state/sp-dashboard.effects';

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
export interface Booking {
  transactions: Transaction[];
  categoryList: Category[];
}

export interface EnvironmentState {
  customer: Customer;
  serviceProvider: ServiceProvider;
}

export interface SPDashboardSate {
  serviceProvider: ServiceProvider;
  category: Category[];
}

export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
}

export interface AppState {
  dashboard: DashboardState;
  listServices: ListServices;
  cart: CartView;
  booking: Booking;
  environment: EnvironmentState;
  spDashboard: SPDashboardSate;
  shared: SharedState;
}

export const appReducer = {
  dashboard: dashBoardReducer,
  listServices: listServiceReducer,
  cart: cartReducer,
  booking: bookingReducer,
  environment: environmentReducer,
  spDashboard: spDashBoardReducer,
  shared: sharedReducer,
};

export const appEffects = [CustomerDashboardEffects, AuthEffects, ListServiceEffects, CartEffects, BookingEffects, SPDashboardEffects];
