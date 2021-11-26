import { createAction, props } from '@ngrx/store';
import { ServiceProvider } from 'src/app/models/service-provider';
import { Transaction } from 'src/app/models/transaction';

export const getSP = createAction('[MANAGE SP] Get service provider', props<{ serviceProviderId }>());
export const getSPSuccess = createAction('[MANAGE SP] Get service provider Success', props<{ serviceProvider: ServiceProvider }>());
export const getSPFailure = createAction('[MANAGE SP] Get service provider Failure', props<{ error: Error }>());
export const udpateTransStatus = createAction('[MANAGE SP] Update Transaction status', props<{ transId: number; status: string }>());
export const udpateTransStatusSuccess = createAction(
  '[MANAGE SP] Update Transaction status Success',
  props<{ transaction: Transaction }>()
);
export const udpateTransStatusFailure = createAction('[MANAGE SP] Update Transaction status Failure', props<{ error: Error }>());
