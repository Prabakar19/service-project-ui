import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Billing } from 'src/app/models/billing';
import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { Transaction } from 'src/app/models/transaction';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { addBilling, addTransaction, setCartList } from './state/cart.actions';
import { getBilling, getCartList } from './state/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartPageComponent implements OnInit {
  pageLoaded: boolean = true;
  cartList: Service[];
  serviceProviderList;
  serviceProvider: ServiceProvider;
  serviceList: Service[];
  billing: Partial<Billing> = {};
  customer: Customer;
  transaction: Partial<Transaction> = {};

  cartList$: Observable<Service[]>;
  billing$: Observable<Billing>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.cartList$ = this.store.select(getCartList);
    this.billing$ = this.store.select(getBilling);
  }

  ngOnInit(): void {
    this.store.dispatch(setLoading({ status: true }));
    this.getCartList();
  }

  getCartList() {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    let spIds = new Set();
    let allServices = [];

    this.store.dispatch(setCartList({ cartList }));
    this.cartList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.cartList = res;
    });

    this.cartList.map((service) => spIds.add(service.serviceProviderId));
    spIds.forEach((spId) => {
      let sameSPServices = [];
      this.cartList.map((service) => {
        if (service.serviceProviderId === spId) sameSPServices.push(service);
      });
      allServices.push(sameSPServices);
    });
    this.serviceProviderList = allServices;
    this.store.dispatch(setLoading({ status: false }));
  }

  getService(serviceList) {
    this.serviceList = serviceList;
  }

  removeItem(item) {
    const cartList = this.cartList.filter((cat) => cat.serviceId !== item.serviceId);
    this.store.dispatch(setCartList({ cartList }));
    localStorage.setItem('cart', JSON.stringify(cartList));
  }

  checkOutHandler(serviceList) {
    this.store.dispatch(setLoading({ status: true }));

    this.customer = JSON.parse(localStorage.getItem('token'));
    //TODO - get customer from state rather than localstorage

    this.billing.totalCost = 0;
    this.billing.customerId = this.customer.customerId;
    this.billing.gst = 6;
    this.billing.serviceProviderId = serviceList[0].serviceProviderId;

    this.addBilling(this.billing, serviceList);
  }

  addBilling(billing, serviceList) {
    this.store.dispatch(addBilling(billing));
    this.billing$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.billing = res;
      if (this.billing) {
        serviceList.map((service) => {
          this.addTransaction(service.serviceId, billing.customerId, this.billing.billingId);
          this.deleteCheckedOutHandler(serviceList);
          //TODO - cut out these function call and make it possible here
        });
      }
    });
  }

  addTransaction(serviceId, custId, billId) {
    this.transaction.serviceId = serviceId;
    this.transaction.billingId = billId;
    this.transaction.customerId = custId;
    this.transaction.status = 'ongoing';
    this.store.dispatch(addTransaction({ transaction: this.transaction }));
  }

  deleteCheckedOutHandler(serviceList) {
    serviceList.map((service) => {
      this.removeItem(service);
    });
  }
}
