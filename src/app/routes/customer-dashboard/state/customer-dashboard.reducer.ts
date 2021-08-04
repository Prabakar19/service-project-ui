import { createReducer, on, Action } from '@ngrx/store';
import * as DashboardActions from './customer-dashboard.actions';

export const initialState = {
  category: [],
  filteredCategoryNames: [],
  cities: [],
};

const _dashBoardReducer = createReducer(
  initialState,
  on(DashboardActions.loadCategory, (state) => state),
  on(DashboardActions.loadCategorySuccess, (state, props) => ({
    ...state,
    category: props.categories,
  })),
  on(DashboardActions.loadSelectedCategory, (state) => state),
  on(DashboardActions.loadSelectedCategorySuccess, (state, props) => ({
    ...state,
    filteredCategoryNames: props.categoryNames,
  })),
  on(DashboardActions.loadCities, (state) => state),
  on(DashboardActions.loadCitiesSuccess, (state, { cities }) => ({
    ...state,
    cities: cities,
  }))
);

export function dashBoardReducer(state: any | undefined, action: Action) {
  return _dashBoardReducer(state, action);
}
