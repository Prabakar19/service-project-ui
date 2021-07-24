import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export enum DashboardActionTypes {
  LOAD_CATEGORY = '[CATEGORY] Load Category',
  LOAD_CATEGORY_SUCCESS = '[CATEGORY] Load Category Success',
  LOAD_CATEGORY_FAILURE = '[CATEGORY] Load Category Failure',
  LOAD_SELECTED_CATEGORY = '[CATEGORY] Load Selected Category',
  LOAD_SELECTED_CATEGORY_SUCCESS = '[CATEGORY] Load Selected Category Success',
  LOAD_SELECTED_CATEGORY_FAILURE = '[CATEGORY] Load Selected Category Failure',
  LOAD_CITIES = '[CITY] Load Cities',
  LOAD_CITIES_SUCCESS = '[CITY] Load Cities Success',
  LOAD_CITIES_FAILURE = '[CITY] Load Cities Failure',
}

export const loadCategory = createAction(DashboardActionTypes.LOAD_CATEGORY);

export const loadCategorySuccess = createAction(DashboardActionTypes.LOAD_CATEGORY_SUCCESS, props<{ categories: Category[] }>());

export const loadCategoryFailure = createAction(DashboardActionTypes.LOAD_CATEGORY_FAILURE, props<{ error: Error }>());

export const loadSelectedCategory = createAction(DashboardActionTypes.LOAD_SELECTED_CATEGORY, props<{ cityName: string }>());

export const loadSelectedCategorySuccess = createAction(
  DashboardActionTypes.LOAD_SELECTED_CATEGORY_SUCCESS,
  props<{ categoryNames: string[] }>()
);

export const loadSelectedCategoryFailure = createAction(DashboardActionTypes.LOAD_SELECTED_CATEGORY_FAILURE, props<{ error: Error }>());

export const loadCities = createAction(DashboardActionTypes.LOAD_CITIES);

export const loadCitiesSuccess = createAction(DashboardActionTypes.LOAD_CITIES_SUCCESS, props<{ cities: string[] }>());

export const loadCitiesFailure = createAction(DashboardActionTypes.LOAD_CITIES_FAILURE, props<{ error: Error }>());
