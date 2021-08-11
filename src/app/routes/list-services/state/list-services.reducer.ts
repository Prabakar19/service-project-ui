import { Action, createReducer, on } from '@ngrx/store';
import {
  getCategory,
  getCategorySuccess,
  loadServices,
  loadServicesSuccess,
  setService,
  loadServicesProvider,
  loadServicesProviderSuccess,
} from './list-services.actions';

export const initialState = {
  selectedCategory: null,
  serviceList: [],
  serviceProvider: null,
  service: null,
};

const _listServiceReducer = createReducer(
  initialState,
  on(loadServices, (state, props) => state),
  on(loadServicesSuccess, (state, props) => ({ ...state, serviceList: props.listServices })),
  on(getCategory, (state, props) => state),
  on(getCategorySuccess, (state, props) => ({ ...state, selectedCategory: props.category })),
  on(loadServicesProvider, (state, props) => state),
  on(loadServicesProviderSuccess, (state, props) => ({ ...state, serviceProvider: props.serviceProvider })),
  on(setService, (state, props) => ({ ...state, service: props.service }))
);

export function listServiceReducer(state: any | undefined, action: Action) {
  return _listServiceReducer(state, action);
}
