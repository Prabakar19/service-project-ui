import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category-service/category-service.service';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import * as DashBoardActions from './customer-dashboard.actions';

@Injectable()
export class CustomerDashboardEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private serviceProviderService: ServiceProviderService,
    private store: Store<AppState>
  ) {}

  loadCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashBoardActions.loadCategory),
      mergeMap(() =>
        this.categoryService.getCategoryListRequest().pipe(
          map((categories) => {
            this.store.dispatch(setLoading({ status: false }));
            return DashBoardActions.loadCategorySuccess({ categories });
          }),
          catchError((error) => of(DashBoardActions.loadCategoryFailure({ error })))
        )
      )
    )
  );

  selectedCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashBoardActions.loadSelectedCategory),
      mergeMap((action) =>
        this.categoryService.getCategoriesByCity(action.cityName).pipe(
          map((categoryNames) => {
            this.store.dispatch(setLoading({ status: false }));
            return DashBoardActions.loadSelectedCategorySuccess({ categoryNames });
          }),
          catchError((error) => of(DashBoardActions.loadSelectedCategoryFailure({ error })))
        )
      )
    )
  );

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashBoardActions.loadCities),
      mergeMap(() =>
        this.serviceProviderService.getSPCities().pipe(
          map((cities) => {
            this.store.dispatch(setLoading({ status: false }));
            return DashBoardActions.loadCitiesSuccess({ cities });
          }),
          catchError((error) => of(DashBoardActions.loadCitiesFailure({ error })))
        )
      )
    )
  );
}
