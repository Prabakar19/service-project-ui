import { createAction, props } from '@ngrx/store';

export const setCartList = createAction('[CART] set Cart List', props<{ cartList }>());
export const addBilling = createAction('[CART] add Billing', props<{ billing }>());
export const addBillingSuccess = createAction('[CART] add Billing Success', props<{ billing }>());
export const addTransaction = createAction('[CART] add Transaction', props<{ transaction }>());
export const addTransactionSuccess = createAction('[CART] add Transaction Success', props<{ transaction }>());
