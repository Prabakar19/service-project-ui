import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { CustomerServices } from 'src/app/services/customerService/customer.service';
import { setErrorMessage, setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { addCustomerAddress, addCustomerAddressSucess, custLogin, custLoginSucess, custRegister, custRegisterSucess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerServices,
    private store: Store<AppState>,
    private router: Router
  ) {}
  custLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(custLogin),
      mergeMap((action) =>
        this.customerService.customerLoginRequest({ emailId: action.emailId, password: action.password }).pipe(
          map((customer) => {
            this.store.dispatch(setLoading({ status: false }));
            return custLoginSucess({ customer });
          }),
          catchError((error) => {
            const errorMsg = error.error;
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        )
      )
    )
  );

  custLoginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(custLoginSucess),
        tap((action) => {
          this.router.navigateByUrl('/customerdashboard');
        })
      ),
    { dispatch: false }
  );

  custRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(custRegister),
      mergeMap((action) => {
        return this.customerService.addCustomerRequest(action.customer).pipe(
          map((customer) => {
            this.store.dispatch(setLoading({ status: false }));
            return custRegisterSucess({ customer });
          }),
          catchError((error) => {
            const errorMsg = 'customer already exist with these details';
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        );
      })
    )
  );

  custAddressAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCustomerAddress),
      mergeMap((action) => {
        return this.customerService.addCustomerAddressReq(action.address, action.customerId).pipe(
          map((customer) => {
            console.log(customer);
            this.store.dispatch(setLoading({ status: false }));
            return addCustomerAddressSucess({ customer });
          }),
          catchError((error) => {
            console.log(error);
            const errorMsg = 'error';
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        );
      })
    )
  );

  custRegisterRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCustomerAddressSucess),
        tap((action) => {
          this.router.navigateByUrl('/customerdashboard');
        })
      ),
    { dispatch: false }
  );
}
