import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { CustomerServices } from 'src/app/services/customer-service/customer.service';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import { setErrorMessage, setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import {
  addCustomerAddress,
  addCustomerAddressSucess,
  addSPAddress,
  addSPAddressSucess,
  custLogin,
  custLoginSucess,
  custRegister,
  custRegisterSucess,
  spLogin,
  spLoginSucess,
  spRegister,
  spRegisterSucess,
  updateCust,
  updateCustAddress,
  updateCustAddressSucess,
  updateCustSucess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerServices,
    private serviceProviderService: ServiceProviderService,
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

  spLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(spLogin),
      mergeMap((action) =>
        this.serviceProviderService.serviceProviderLoginRequest({ emailId: action.emailId, password: action.password }).pipe(
          map((serviceProvider) => {
            this.store.dispatch(setLoading({ status: false }));
            return spLoginSucess({ serviceProvider });
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

  spLoginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(spLoginSucess),
        tap((action) => {
          this.router.navigateByUrl('/spdashboard');
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

  udpateCust$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCust),
      mergeMap((action) => {
        return this.customerService.updateCustomerRequest(action.customer, action.customer.customerId).pipe(
          map((customer) => {
            this.store.dispatch(setLoading({ status: false }));
            return updateCustSucess({ customer });
          }),
          catchError((error) => {
            const errorMsg = 'Error';
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
            this.store.dispatch(setLoading({ status: false }));
            return addCustomerAddressSucess({ customer });
          }),
          catchError((error) => {
            const errorMsg = 'error';
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        );
      })
    )
  );

  updateCustAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCustAddress),
      mergeMap((action) => {
        return this.customerService.updateAddressRequest(action.address, action.addressId).pipe(
          map((address) => {
            this.store.dispatch(setLoading({ status: false }));
            return updateCustAddressSucess({ address });
          }),
          catchError((error) => {
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

  spRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(spRegister),
      mergeMap((action) => {
        return this.serviceProviderService.addServiceProviderRequest(action.serviceProvider).pipe(
          map((serviceProvider) => {
            this.store.dispatch(setLoading({ status: false }));
            return spRegisterSucess({ serviceProvider });
          }),
          catchError((error) => {
            const errorMsg = 'Service Provider already exist with these details';
            this.store.dispatch(setLoading({ status: false }));
            return of(setErrorMessage({ errorMsg }));
          })
        );
      })
    )
  );

  spAddressAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSPAddress),
      mergeMap((action) => {
        console.log(action);
        return this.serviceProviderService.addServiceProviderAddressReq(action.serviceAddress, action.spId).pipe(
          map((serviceProvider) => {
            this.store.dispatch(setLoading({ status: false }));
            return addSPAddressSucess({ serviceProvider });
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

  spRegisterRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSPAddressSucess),
        tap((action) => {
          this.router.navigateByUrl('/spdashboard');
        })
      ),
    { dispatch: false }
  );
}
