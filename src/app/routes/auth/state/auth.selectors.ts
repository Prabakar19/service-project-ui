import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnvironmentState } from '../../../state/state';

const getEnvironmentState = createFeatureSelector<EnvironmentState>('environment');

export const getCustomer = createSelector(getEnvironmentState, (state) => state.customer);

export const getServiceProvider = createSelector(getEnvironmentState, (state) => state.serviceProvider);
