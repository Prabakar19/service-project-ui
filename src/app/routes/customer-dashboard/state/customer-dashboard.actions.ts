import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const loadCategory = createAction('[CATEGORY] Load Category');
export const loadCategorySuccess = createAction('[CATEGORY] Load Category Success', props<{ categories: Category[] }>());
export const loadCategoryFailure = createAction('[CATEGORY] Load Category Failure', props<{ error: Error }>());
export const loadSelectedCategory = createAction('[CATEGORY] Load Selected Category', props<{ cityName: string }>());
export const loadSelectedCategorySuccess = createAction('[CATEGORY] Load Selected Category Success', props<{ categoryNames: string[] }>());
export const loadSelectedCategoryFailure = createAction('[CATEGORY] Load Selected Category Failure', props<{ error: Error }>());
export const loadCities = createAction('[CITY] Load Cities');
export const loadCitiesSuccess = createAction('[CITY] Load Cities Success', props<{ cities: string[] }>());
export const loadCitiesFailure = createAction('[CITY] Load Cities Failure', props<{ error: Error }>());
