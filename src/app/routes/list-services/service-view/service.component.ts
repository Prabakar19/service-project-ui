import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { loadServicesProvider, setService } from '../state/list-services.actions';
import { getService, getServiceProvider } from '../state/list-services.selectors';
import { cloneDeep } from 'lodash';
import { addToCart } from '../../cart/state/cart.actions';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  service: Service;
  cartList: Service[] = [];
  retrievedImage: any;
  serviceProvider: ServiceProvider;

  service$: Observable<Service>;
  serviceProvider$: Observable<ServiceProvider>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.serviceProvider$ = this.store.select(getServiceProvider);
    this.service$ = this.store.select(getService);
  }

  ngOnInit(): void {
    const service = JSON.parse(sessionStorage.getItem('service'));
    this.store.dispatch(setService({ service }));
    this.getServiceProvider();
  }

  getServiceProvider() {
    this.service$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.service = res;
    });

    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loadServicesProvider({ spId: this.service.serviceProviderId }));

    this.serviceProvider$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.serviceProvider = cloneDeep(res);
      // this.retrievedImage = 'data:image/jpeg;base64,' + this.serviceProvider?.serviceProviderPic; // TODO: fix this
      // this.calculateDiscountCost(); // TODO: Fix this method
    });
  }

  // calculateDiscountCost() {
  //   if (this.serviceProvider) {
  //     this.serviceProvider.services.map((service) => {
  //       service.discountedCost = Math.round(service.cost - service.discount * 0.01 * service.cost);
  //     });
  //   }
  // }

  addToCart(service: Service) {
    //  TODO: get customer id here and remove hardcoded value
    const details = { service_id: service.serviceId, customer_id: 'f4f0f5b0-3355-4a8d-b8c3-dd6043136f52' };
    // TODO: fix CORS error here
    // this.store.dispatch(setLoading({ status: true }));
    // this.store.dispatch(addToCart({ details }));

    if (!localStorage.getItem('cart')) {
      this.cartList.push(service);
      localStorage.setItem('cart', JSON.stringify(this.cartList));
    } else {
      this.cartList = JSON.parse(localStorage.getItem('cart'));

      if (!this.cartList.includes(service)) {
        this.cartList.push(service);
        localStorage.setItem('cart', JSON.stringify(this.cartList));
      }
    }
  }
}
