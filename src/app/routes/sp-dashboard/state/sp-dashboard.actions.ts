import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';

export const getSP = createAction('[SP] Get service provider', props<{ serviceProviderId }>());
export const getSPSuccess = createAction('[SP] Get service provider Success', props<{ serviceProvider: ServiceProvider }>());
export const getSPFailure = createAction('[SP] Get service provider Failure', props<{ error: Error }>());
export const getServiceList = createAction('[SP] Get service provider services', props<{ serviceProviderId }>());
export const getServiceListSuccess = createAction('[SP] Get service provider services Success', props<{ serviceList: Service[] }>());
export const getServiceListFailure = createAction('[SP] Get service provider services Failure', props<{ error: Error }>());

export const loadCategory = createAction('[SP] Load Category');
export const loadCategorySuccess = createAction('[SP] Load Category Success', props<{ categories: Category[] }>());
export const loadCategoryFailure = createAction('[SP] Load Category Failure', props<{ error: Error }>());
export const addService = createAction('[SP] add service', props<{ service: Service }>());
export const addServiceSuccess = createAction('[SP] add service Success', props<{ service }>());
export const addServiceFailure = createAction('[SP] add service Failure', props<{ error: Error }>());
export const editService = createAction('[SP] Edit service', props<{ service: Service }>());
export const editServiceSuccess = createAction('[SP] Edit service Success', props<{ service }>());
export const editServiceFailure = createAction('[SP] Edit service Failure', props<{ error: Error }>());
export const removeService = createAction('[SP] Remove service', props<{ serviceId: string }>());
export const removeServiceSuccess = createAction('[SP] Remove service Success', props<{ serviceId: string }>());
export const removeServiceFailure = createAction('[SP] Remove service Failure', props<{ error: Error }>());
