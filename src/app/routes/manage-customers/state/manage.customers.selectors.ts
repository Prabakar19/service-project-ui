import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ManageCustomerSate } from '../../../state/state';

const getManageCustomerState = createFeatureSelector<ManageCustomerSate>('manageCustomer');

export const getServiceProvider = createSelector(getManageCustomerState, (state) => state.serviceProvider);
