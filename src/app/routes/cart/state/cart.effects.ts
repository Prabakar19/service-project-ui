import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BillingService } from 'src/app/services/billing-service/billing.service';
import { setErrorMessage, setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import {
  addBilling,
  addBillingSuccess,
  addTransaction,
  addTransactionSuccess,
  addToCart,
  addToCartSuccess,
  setCartList,
  getCartListAction,
} from './cart.actions';
import { isObject, isNull } from 'lodash';
import { CartService } from 'src/app/services/cart-service/cart-serivice.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private billingService: BillingService,
    private cartService: CartService
  ) {}

  addBilling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBilling),
      mergeMap((action) =>
        this.billingService.addBillingRequest(action).pipe(
          map((billing) => {
            this.store.dispatch(setLoading({ status: false }));
            return addBillingSuccess({ billing });
          }),
          catchError((error) => {
            const errorMsg = isObject(error.error) || isNull(error.error) ? 'some error occurred' : error.error;
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        )
      )
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTransaction),
      mergeMap((action) =>
        this.billingService.addTransactionRequest(action.transaction).pipe(
          map((transaction) => {
            this.store.dispatch(setLoading({ status: false }));
            return addTransactionSuccess({ transaction });
          }),
          catchError((error) => {
            const errorMsg = isObject(error.error) || isNull(error.error) ? 'some error occurred' : error.error;
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        )
      )
    )
  );

  addCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      mergeMap((action) =>
        this.cartService.addSericeToCartRequest(action).pipe(
          map((data) => {
            this.store.dispatch(setLoading({ status: false }));
            return addToCartSuccess({ data });
          }),
          catchError((error) => {
            const errorMsg = isObject(error.error) || isNull(error.error) ? 'some error occurred' : error.error;
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        )
      )
    )
  );

  getCartList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCartListAction),
      mergeMap((action) =>
        this.cartService.getCartListForCustomer(action).pipe(
          map((cartList) => {
            this.store.dispatch(setLoading({ status: false }));
            return setCartList({ cartList });
          }),
          catchError((error) => {
            const errorMsg = isObject(error.error) || isNull(error.error) ? 'some error occurred' : error.error;
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        )
      )
    )
  );
}
