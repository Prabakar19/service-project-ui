import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Booking } from 'src/app/state/state';

const getBookingState = createFeatureSelector<Booking>('booking');

export const getTransactions = createSelector(getBookingState, (state) => state.transactions);
export const getCategories = createSelector(getBookingState, (state) => state.categoryList);
