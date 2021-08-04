import { Category } from '../models/category';
import { Customer } from '../models/customer';
import { ServiceProvider } from '../models/service-provider';
import { dashBoardReducer } from '../routes/customer-dashboard/state/customer-dashboard.reducer';
import { environmentReducer } from '../routes/auth/state/auth.reducer';
import { sharedReducer } from './shared/shared.reducer';
import { Service } from '../models/service';
import { listServiceReducer } from '../routes/list-services/state/list-services.reducer';

export interface DashboardState {
  category: Category[];
  filteredCategoryNames: string[];
  cities: string[];
}
export interface ListServices {
  selectedCategory: Category;
  serviceList: Service[];
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
  environment: EnvironmentState;
  shared: SharedState;
}

export const appReducer = {
  dashboard: dashBoardReducer,
  listServices: listServiceReducer,
  environment: environmentReducer,
  shared: sharedReducer,
};
