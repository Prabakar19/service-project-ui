import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnvironmentState } from '../../../state/state';

const getEnvironmentState = createFeatureSelector<EnvironmentState>('environment');

export const getCustomer = createSelector(getEnvironmentState, (state) => state.customer);
export const getCustAddress = createSelector(getEnvironmentState, (state) => state.custAddress);
export const getServiceProvider = createSelector(getEnvironmentState, (state) => state.serviceProvider);
