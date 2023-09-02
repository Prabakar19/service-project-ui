import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Billing } from 'src/app/models/billing';
import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { Transaction } from 'src/app/models/transaction';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { addBilling, addTransactions, getCartListAction, setCartList } from './state/cart.actions';
import { getBilling, getCartList } from './state/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartList: Service[];
  serviceList: Service[];
  customer: Customer;
  billing: Partial<Billing> = {};
  transaction: Partial<Transaction> = {};
  transactionList: Partial<Transaction>[] = [];
  serviceProviderList;

  cartList$: Observable<Service[]>;
  billing$: Observable<Billing>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.cartList$ = this.store.select(getCartList);
    this.billing$ = this.store.select(getBilling);
  }

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList() {
    this.store.dispatch(setLoading({ status: true }));
    const cartList = JSON.parse(localStorage.getItem('cart'));
    const spIds = new Set();
    const allServices = [];

    // TODO: get customer id from store
    // const customerId = 'f4f0f5b0-3355-4a8d-b8c3-dd6043136f52';
    //TODO: this action updates the store little late so this.cartList goes empty at first
    // this.store.dispatch(getCartListAction({ customerId }));
    this.store.dispatch(setCartList({ cartList }));

    this.cartList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.cartList = res;
    });

    this.cartList.map((service) => spIds.add(service.serviceProviderId));
    spIds.forEach((spId) => {
      const sameSPServices = [];
      this.cartList.map((service) => {
        if (service.serviceProviderId === spId) {
          sameSPServices.push(service);
        }
      });
      allServices.push(sameSPServices);
    });
    this.serviceProviderList = allServices;
    this.store.dispatch(setLoading({ status: false }));
  }

  getService(serviceList) {
    this.serviceList = serviceList;
  }

  checkOutHandler(serviceList) {
    this.store.dispatch(setLoading({ status: true }));
    this.customer = JSON.parse(localStorage.getItem('token'));
    // TODO - get customer from state rather than localstorage

    this.billing.totalCost = 0;
    this.billing.customerId = this.customer.customerId;
    this.billing.gst = 6; // 6% GST
    this.billing.serviceProviderId = serviceList[0].serviceProviderId;
    this.addBilling(this.billing, serviceList);
  }

  addBilling(billing, serviceList) {
    this.store.dispatch(addBilling(billing));
    this.billing$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.billing = res;
      if (this.billing) {
        this.addTransactionsList(serviceList);
        // this.deleteCheckedOutHandler(serviceList);
      }
    });
  }

  addTransactionsList(serviceList) {
    serviceList.map((service) => {
      let transaction: Partial<Transaction> = {};
      transaction.serviceId = service.serviceId;
      transaction.originalCost = service.cost;
      transaction.transactionAmount = service.discountedCost;
      transaction.billingId = this.billing.billingId;
      transaction.status = 'ongoing';
      this.transactionList.push(transaction);
    });
    this.store.dispatch(addTransactions({ transactions: this.transactionList }));
  }

  deleteCheckedOutHandler(serviceList) {
    serviceList.map((service) => {
      this.removeItem(service);
    });
  }

  removeItem(item) {
    // TODO: add code to remove cart items form database
    const cartList = this.cartList.filter((cat) => cat.serviceId !== item.serviceId);
    this.store.dispatch(setCartList({ cartList }));
    localStorage.setItem('cart', JSON.stringify(cartList));
  }
}
