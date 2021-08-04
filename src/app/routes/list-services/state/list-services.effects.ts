import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CategoryServiceService } from 'src/app/services/category-service/category-service.service';
import { ServiceService } from 'src/app/services/service-service/service.service';
import { setErrorMessage, setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { getCategory, getCategorySuccess, loadServices, loadServicesSuccess } from './list-services.actions';

@Injectable()
export class ListServiceEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryServiceService,
    private service: ServiceService,
    private store: Store<AppState>
  ) {}

  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategory),
      mergeMap((action) =>
        this.categoryService.getCategoryByNameRequest(action.categoryName).pipe(
          map((category) => {
            this.store.dispatch(setLoading({ status: false }));
            return getCategorySuccess({ category });
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

  loadServiceList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadServices),
      mergeMap((action) =>
        this.service.getServiceList(action.catId, action.location).pipe(
          map((listServices) => {
            this.store.dispatch(setLoading({ status: false }));
            return loadServicesSuccess({ listServices });
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
}
