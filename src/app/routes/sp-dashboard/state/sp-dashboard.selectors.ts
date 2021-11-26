import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SPDashboardSate } from '../../../state/state';

const getSPDashboardState = createFeatureSelector<SPDashboardSate>('spDashboard');

export const getServiceProvider = createSelector(getSPDashboardState, (state) => state.serviceProvider);
export const getCategory = createSelector(getSPDashboardState, (state) => state.category);
