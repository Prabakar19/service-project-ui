import { createAction, props } from '@ngrx/store';

export const loadServices = createAction('[LIST SERVICES] Load Services', props<{ catId: number; location: string }>());
export const loadServicesSuccess = createAction('[LIST SERVICES] Load Services Success', props<{ listServices }>());
export const loadServicesFailure = createAction('[LIST SERVICES] Load Services Failure');
export const getCategory = createAction('[LIST SERVICES] Get category', props<{ categoryName: string }>());
export const getCategorySuccess = createAction('[LIST SERVICES] Get category Success', props<{ category }>());
