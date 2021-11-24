import { createReducer, on, Action } from '@ngrx/store';
import { SPDashboardSate } from 'src/app/state/state';
import { addServiceSuccess, editServiceSuccess, getSPSuccess, loadCategorySuccess, removeServiceSuccess } from './sp-dashboard.actions';

export const initialState: SPDashboardSate = {
  serviceProvider: null,
  category: [],
};

const _spDashBoardReducer = createReducer(
  initialState,
  on(getSPSuccess, (state, props) => ({
    ...state,
    serviceProvider: props.serviceProvider,
  })),
  on(loadCategorySuccess, (state, props) => ({
    ...state,
    category: props.categories,
  })),
  on(addServiceSuccess, (state, props) => ({
    ...state,
    serviceProvider: { ...state.serviceProvider, services: [...state.serviceProvider.services, props.service] },
  })),
  on(editServiceSuccess, (state, props) => ({
    ...state,
    serviceProvider: { ...state.serviceProvider, services: [...state.serviceProvider.services, props.service] },
  })),
  on(removeServiceSuccess, (state, props) => {
    const services = state.serviceProvider.services.filter((service) => service.serviceId !== props.serviceId);
    return {
      ...state,
      serviceProvider: { ...state.serviceProvider, services: services },
    };
  })
);

export function spDashBoardReducer(state: any | undefined, action: Action) {
  return _spDashBoardReducer(state, action);
}
