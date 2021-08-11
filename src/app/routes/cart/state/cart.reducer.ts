import { Action, createReducer, on } from '@ngrx/store';
import { setCartList } from './cart.actions';

export const initialState = {
  cartList: [],
};

const _cartReducer = createReducer(
  initialState,
  on(setCartList, (state, props) => ({ ...state, cartList: props.cartList }))
);

export function cartReducer(state: any | undefined, action: Action) {
  return _cartReducer(state, action);
}
