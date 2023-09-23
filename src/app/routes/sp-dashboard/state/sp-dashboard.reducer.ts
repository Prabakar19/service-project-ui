import { createReducer, on, Action } from '@ngrx/store';
import { SPDashboardSate } from 'src/app/state/state';
import {
  addServiceSuccess,
  editServiceSuccess,
  getSPSuccess,
  getServiceListSuccess,
  loadCategorySuccess,
  removeServiceSuccess,
} from './sp-dashboard.actions';

export const initialState: SPDashboardSate = {
  serviceProvider: null,
  category: [],
  services: [],
};

const _spDashBoardReducer = createReducer(
  initialState,
  on(getSPSuccess, (state, props) => ({
    ...state,
    serviceProvider: props.serviceProvider,
  })),
  on(getServiceListSuccess, (state, props) => ({
    ...state,
    services: props.serviceList,
  })),
  on(loadCategorySuccess, (state, props) => ({
    ...state,
    category: props.categories,
  })),
  on(addServiceSuccess, (state, props) => ({
    ...state,
    services: [...state.services, props.service],
  })),
  on(editServiceSuccess, (state, props) => ({
    ...state,
    services: [...state.services, props.service],
  })),
  on(removeServiceSuccess, (state, props) => {
    const services = state.services.filter((service) => service.serviceId !== props.serviceId);
    return {
      ...state,
      services: services,
    };
  })
);

export function spDashBoardReducer(state: any | undefined, action: Action) {
  return _spDashBoardReducer(state, action);
}
