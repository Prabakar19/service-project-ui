import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { getSP, getSPFailure, getSPSuccess, udpateTransStatus, udpateTransStatusSuccess } from './manage.customers.actions';

@Injectable()
export class ManageCustomerEffects {
  constructor(private actions$: Actions, private serviceProviderService: ServiceProviderService, private store: Store<AppState>) {}

  getSP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSP),
      mergeMap((action) =>
        this.serviceProviderService.getServiceProviderRequest(action.serviceProviderId).pipe(
          map((serviceProvider) => {
            this.store.dispatch(setLoading({ status: false }));
            return getSPSuccess({ serviceProvider });
          }),
          catchError((error) => of(getSPFailure({ error })))
        )
      )
    )
  );

  updateTransactionStature$ = createEffect(() =>
    this.actions$.pipe(
      ofType(udpateTransStatus),
      mergeMap((action) =>
        this.serviceProviderService.updateTransactionStatusById(action.transId, action.status).pipe(
          map((transaction) => {
            this.store.dispatch(setLoading({ status: false }));
            return udpateTransStatusSuccess({ transaction });
          }),
          catchError((error) => of(getSPFailure({ error })))
        )
      )
    )
  );
}
