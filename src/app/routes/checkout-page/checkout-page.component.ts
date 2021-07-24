import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  service: Service;
  cartList: Service[] = [];

  retrievedImage: any;

  serviceProvider: ServiceProvider;
  pageLoaded: boolean = false;

  constructor(
    private http: HttpClient,
    private serviceproviderService: ServiceProviderService
  ) {}

  ngOnInit(): void {
    this.service = JSON.parse(sessionStorage.getItem('service'));
    this.getServiceProvider();
  }

  getServiceProvider() {
    this.serviceproviderService
      .getServiceProviderRequest(this.service.serviceProviderId)
      .subscribe(
        (res) => {
          this.serviceProvider = res;
          console.log(this.serviceProvider);
          this.retrievedImage =
            'data:image/jpeg;base64,' + this.serviceProvider.serviceProviderPic;
          this.calculateDiscountCost();
          this.pageLoaded = true;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  calculateDiscountCost() {
    for (let i = 0; i < this.serviceProvider.services.length; i++) {
      this.serviceProvider.services[i].discountedCost = Math.round(
        this.serviceProvider.services[i].cost -
          (this.serviceProvider.services[i].discount / 100) *
            this.serviceProvider.services[i].cost
      );
    }
  }
  addToCart(service: Service) {
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
