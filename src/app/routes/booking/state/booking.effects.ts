import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BillingService } from 'src/app/services/billing-service/billing.service';
import { setErrorMessage, setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';

import { isObject, isNull } from 'lodash';
import {
  downloadReport,
  getAllCategory,
  getAllCategorySuccess,
  getAllTransactions,
  getAllTransactionsSuccess,
  updateRating,
  updateRatingSuccess,
} from './booking.actions';
import { CategoryService } from 'src/app/services/category-service/category-service.service';
import { DownloadServiceService } from 'src/app/services/download-service.service';
import { ServiceService } from 'src/app/services/service-service/service.service';

@Injectable()
export class BookingEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private billingService: BillingService,
    private serviceService: ServiceService,
    private downloadService: DownloadServiceService,
    private categoryService: CategoryService
  ) {}

  getTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTransactions),
      mergeMap((action) =>
        this.billingService.getServicesRequest(action.custId).pipe(
          map((transactions) => {
            this.store.dispatch(setLoading({ status: false }));
            return getAllTransactionsSuccess({ transactions });
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

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllCategory),
      mergeMap((action) =>
        this.categoryService.getCategoryListRequest().pipe(
          map((categoryList) => {
            this.store.dispatch(setLoading({ status: false }));
            return getAllCategorySuccess({ categoryList });
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

  updateRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRating),
      mergeMap((action) =>
        this.billingService.updateTransactionRequest(action.transaction, action.txnId).pipe(
          map((transaction) => {
            this.store.dispatch(setLoading({ status: false }));
            return updateRatingSuccess({ transaction });
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

  downloadReport$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(downloadReport),
        tap((action) => {
          const transactionHeader = [
            'transactionId',
            'serviceId',
            'billingId',
            'customerId',
            'status',
            'transactionRating',
            'transactionAmount',
            'originalCost',
            'date',
          ];
          this.downloadService.downloadFile(action.transactionList, 'My bookings', transactionHeader);
        })
      ),
    { dispatch: false }
  );
}
