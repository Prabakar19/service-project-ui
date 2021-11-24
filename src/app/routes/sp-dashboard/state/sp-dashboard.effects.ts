import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category-service/category-service.service';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import { ServiceService } from 'src/app/services/service-service/service.service';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import {
  addService,
  addServiceFailure,
  addServiceSuccess,
  editService,
  editServiceFailure,
  editServiceSuccess,
  getSP,
  getSPFailure,
  getSPSuccess,
  loadCategory,
  loadCategoryFailure,
  loadCategorySuccess,
  removeService,
  removeServiceFailure,
  removeServiceSuccess,
} from './sp-dashboard.actions';

@Injectable()
export class SPDashboardEffects {
  constructor(
    private actions$: Actions,
    private serviceProviderService: ServiceProviderService,
    private serviceService: ServiceService,
    private categoryService: CategoryService,
    private store: Store<AppState>
  ) {}

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

  loadCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategory),
      mergeMap(() =>
        this.categoryService.getCategoryListRequest().pipe(
          map((categories) => {
            this.store.dispatch(setLoading({ status: false }));
            return loadCategorySuccess({ categories });
          }),
          catchError((error) => of(loadCategoryFailure({ error })))
        )
      )
    )
  );

  addService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addService),
      mergeMap((action) =>
        this.serviceService.addServiceRequest(action.service).pipe(
          map((service) => {
            this.store.dispatch(setLoading({ status: false }));
            return addServiceSuccess({ service });
          }),
          catchError((error) => {
            console.log(error);
            return of(addServiceFailure({ error }));
          })
        )
      )
    )
  );

  editService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editService),
      mergeMap((action) =>
        this.serviceService.modifyServiceRequest(action.service, action.serviceId).pipe(
          map((service) => {
            this.store.dispatch(setLoading({ status: false }));
            return editServiceSuccess({ service });
          }),
          catchError((error) => {
            console.log(error);
            return of(editServiceFailure({ error }));
          })
        )
      )
    )
  );

  removeService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeService),
      mergeMap((action) =>
        this.serviceService.deleteServiceRequest(action.serviceId).pipe(
          map(() => {
            this.store.dispatch(setLoading({ status: false }));
            return removeServiceSuccess({ serviceId: action.serviceId });
          }),
          catchError((error) => {
            console.log(error);
            return of(removeServiceFailure({ error }));
          })
        )
      )
    )
  );
}
