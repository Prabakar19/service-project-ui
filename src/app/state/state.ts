import { Category } from '../models/category';
import { Customer } from '../models/customer';
import { ServiceProvider } from '../models/service-provider';
import { dashBoardReducer } from '../routes/customer-dashboard/state/customer.dashboard.reducer';
import { environmentReducer } from '../routes/auth/state/auth.reducer';
import { sharedReducer } from './shared/shared.reducer';

export interface DashboardState {
  category: Category[];
  filteredCategoryNames: string[];
  cities: string[];
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
  environment: EnvironmentState;
  shared: SharedState;
}

export const appReducer = {
  dashboard: dashBoardReducer,
  environment: environmentReducer,
  shared: sharedReducer,
};
