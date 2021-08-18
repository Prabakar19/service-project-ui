import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartView } from 'src/app/state/state';

const getCartState = createFeatureSelector<CartView>('cart');

export const getCartList = createSelector(getCartState, (state) => state.cartList);
export const getBilling = createSelector(getCartState, (state) => state.billing);
