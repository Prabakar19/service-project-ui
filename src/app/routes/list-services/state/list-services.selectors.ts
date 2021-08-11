import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListServices } from 'src/app/state/state';

const getServiceState = createFeatureSelector<ListServices>('listServices');

export const getSelectedCategory = createSelector(getServiceState, (state) => state.selectedCategory);
export const getServiceList = createSelector(getServiceState, (state) => state.serviceList);
export const getServiceProvider = createSelector(getServiceState, (state) => state.serviceProvider);
export const getService = createSelector(getServiceState, (state) => state.service);
