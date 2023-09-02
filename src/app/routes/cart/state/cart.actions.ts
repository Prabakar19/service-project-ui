import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('[CART] Add Service To Cart', props<{ details }>());
export const addToCartSuccess = createAction('[CART] Add Service To Cart', props<{ data }>());
export const setCartList = createAction('[CART] Set Cart List', props<{ cartList }>());
export const getCartListAction = createAction('[CART] Get Cart List', props<{ customerId }>());
export const addBilling = createAction('[CART] Add Billing', props<{ billing }>());
export const addBillingSuccess = createAction('[CART] Add Billing Success', props<{ billing }>());
export const addTransactions = createAction('[CART] add Transactions List', props<{ transactions }>());
export const addTransactionsSuccess = createAction('[CART] Add Transactions List Success', props<{ data }>());
