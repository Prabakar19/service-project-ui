import { createReducer, on, Action } from '@ngrx/store';
import {
  loadCategory,
  loadCategorySuccess,
  loadCities,
  loadCitiesSuccess,
  loadSelectedCategory,
  loadSelectedCategorySuccess,
} from './customer-dashboard.actions';

export const initialState = {
  category: [],
  filteredCategoryNames: [],
  cities: [],
};

const _dashBoardReducer = createReducer(
  initialState,
  on(loadCategory, (state) => state),
  on(loadCategorySuccess, (state, props) => ({
    ...state,
    category: props.categories,
  })),
  on(loadSelectedCategory, (state) => state),
  on(loadSelectedCategorySuccess, (state, props) => ({
    ...state,
    filteredCategoryNames: props.categoryNames,
  })),
  on(loadCities, (state) => state),
  on(loadCitiesSuccess, (state, { cities }) => ({
    ...state,
    cities: cities,
  }))
);

export function dashBoardReducer(state: any | undefined, action: Action) {
  return _dashBoardReducer(state, action);
}
