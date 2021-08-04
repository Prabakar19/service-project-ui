import { Action, createReducer, on } from '@ngrx/store';
import { getCategory, getCategorySuccess, loadServices, loadServicesSuccess } from './list-services.actions';

export const initialState = {
  selectedCategory: null,
  serviceList: [],
};

const _listServiceReducer = createReducer(
  initialState,
  on(loadServices, (state, props) => state),
  on(loadServicesSuccess, (state, props) => ({ ...state, serviceList: props.listServices })),
  on(getCategory, (state, props) => state),
  on(getCategorySuccess, (state, props) => ({ ...state, selectedCategory: props.category }))
);

export function listServiceReducer(state: any | undefined, action: Action) {
  return _listServiceReducer(state, action);
}
