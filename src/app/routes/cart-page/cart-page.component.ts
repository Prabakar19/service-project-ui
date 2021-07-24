import { Component, OnInit } from '@angular/core';
import { Billing } from 'src/app/models/billing';
import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { Transaction } from 'src/app/models/transaction';
import { BillingService } from 'src/app/services/billing-service/billing.service';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
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

  constructor(
    private billingService: BillingService,
    private serviceProviderService: ServiceProviderService
  ) {}

  ngOnInit(): void {
    this.getCartList();
    this.pageLoaded = true;
  }

  getCartList() {
    this.cartList = JSON.parse(localStorage.getItem('cart'));
    console.log(this.cartList);

    let intermediate = new Set();
    this.cartList.forEach((obj) => {
      intermediate.add(obj.serviceProviderId);
    });
    let output = [];
    intermediate.forEach((spId) => {
      let same = [];
      this.cartList.forEach((cart) => {
        if (cart.serviceProviderId === spId) same.push(cart);
      });
      output.push(same);
    });

    this.serviceProviderList = output;
  }

  getService(serviceList) {
    this.serviceList = serviceList;
    // console.log(this.serviceList);
  }

  clickEventHandler(cart) {
    this.cartList = this.cartList.filter(
      (cat) => cat.serviceId !== cart.serviceId
    );
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
          this.addTransaction(
            service.serviceId,
            billing.customerId,
            this.billing.billingId
          );

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
