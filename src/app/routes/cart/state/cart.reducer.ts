import { Action, createReducer, on } from '@ngrx/store';
import { addBillingSuccess, setCartList } from './cart.actions';

export const initialState = {
  cartList: [],
  billing: null,
};

const _cartReducer = createReducer(
  initialState,
  on(setCartList, (state, props) => ({ ...state, cartList: props.cartList })),
  on(addBillingSuccess, (state, props) => ({ ...state, billing: props.billing }))
);

export function cartReducer(state: any | undefined, action: Action) {
  return _cartReducer(state, action);
}
