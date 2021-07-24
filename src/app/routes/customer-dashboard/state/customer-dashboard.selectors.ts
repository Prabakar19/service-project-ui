import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../../../state/state';

const getDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const getCategory = createSelector(getDashboardState, (state) => state.category);

export const getFilteredCategory = createSelector(getDashboardState, (state) => state.filteredCategoryNames);

export const getCities = createSelector(getDashboardState, (state) => state.cities);
