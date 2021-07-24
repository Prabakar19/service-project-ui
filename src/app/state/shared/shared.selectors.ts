import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from '../state';

const getSharedState = createFeatureSelector<SharedState>('shared');

export const getLoader = createSelector(getSharedState, (state) => state.showLoading);
export const getErrorMessage = createSelector(getSharedState, (state) => state.errorMessage);
