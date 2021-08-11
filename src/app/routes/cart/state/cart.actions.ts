import { createAction, props } from '@ngrx/store';

export const setCartList = createAction('[CART] set Cart List', props<{ cartList }>());
