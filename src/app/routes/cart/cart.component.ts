import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Billing } from 'src/app/models/billing';
import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { Transaction } from 'src/app/models/transaction';
import { BillingService } from 'src/app/services/billing-service/billing.service';
import { AppState } from 'src/app/state/state';
import { setCartList } from './state/cart.actions';
import { getCartList } from './state/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartPageComponent implements OnInit {
  pageLoaded: boolean = false;
  cartList: Service[];
  serviceProviderList;
  serviceProvider: ServiceProvider;
  serviceList: Service[];
  billing: Partial<Billing> = {};
  customer: Customer;
  transaction: Partial<Transaction> = {};

  cartList$: Observable<Service[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private billingService: BillingService, private store: Store<AppState>) {
    this.cartList$ = this.store.select(getCartList);
  }

  ngOnInit(): void {
    this.getCartList();
    this.pageLoaded = true;
  }

  getCartList() {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    this.store.dispatch(setCartList({ cartList }));
    this.cartList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.cartList = res;
    });

    let intermediate = new Set();

    this.cartList.map((service) => {
      intermediate.add(service.serviceProviderId);
    });

    let output = [];
    intermediate.forEach((spId) => {
      let same = [];
      this.cartList.map((service) => {
        if (service.serviceProviderId === spId) same.push(service);
      });
      output.push(same);
    });

    this.serviceProviderList = output;
  }

  getService(serviceList) {
    this.serviceList = serviceList;
  }

  clickEventHandler(cart) {
    this.cartList = this.cartList.filter((cat) => cat.serviceId !== cart.serviceId);
    localStorage.setItem('cart', JSON.stringify(this.cartList));
  }

  checkOutHandler(serviceList) {
    this.pageLoaded = false;
    this.customer = JSON.parse(localStorage.getItem('token'));

    this.billing.totalCost = 0;
    this.billing.customerId = this.customer.customerId;
    this.billing.gst = 6;
    this.billing.serviceProviderId = serviceList[0].serviceProviderId;

    this.addBilling(this.billing, serviceList);
  }

  addBilling(billing, serviceList) {
    this.billingService.addBillingRequest(billing).subscribe(
      (res) => {
        this.billing = res;
        console.log(this.billing);
        serviceList.map((service) => {
          this.addTransaction(service.serviceId, billing.customerId, this.billing.billingId);

          this.deleteCheckedOutHandler(serviceList);
          this.pageLoaded = true;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addTransaction(serviceId, custId, billId) {
    this.transaction.serviceId = serviceId;
    this.transaction.billingId = billId;
    this.transaction.customerId = custId;
    this.transaction.status = 'ongoing';
    console.log(billId);
    this.billingService.addTransactionRequest(this.transaction).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCheckedOutHandler(serviceList) {
    serviceList.map((service) => {
      this.clickEventHandler(service);
    });
  }

  // getServiceProviderName(serviceList) {
  //   this.pageLoaded = false;
  //   this.serviceProviderService
  //     .getServiceProviderRequest(serviceList[0].serviceProviderId)
  //     .subscribe(
  //       (res) => {
  //         this.serviceProvider = res;
  //         this.pageLoaded = true;
  //         return this.serviceProvider.companyName;
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }
}
