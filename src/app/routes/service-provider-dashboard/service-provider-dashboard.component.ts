import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import { HttpClient } from '@angular/common/http';
import { AddServiceComponent } from '../add-service/add-service.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-service-provider-dashboard',
  templateUrl: './service-provider-dashboard.component.html',
  styleUrls: ['./service-provider-dashboard.component.css'],
})
export class ServiceProviderDashboardComponent implements OnInit {
  service: Service;
  cartList: Service[] = [];

  serviceProvider: ServiceProvider;
  pageLoaded = false;

  constructor(private http: HttpClient, private serviceproviderService: ServiceProviderService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.serviceProvider = JSON.parse(localStorage.getItem('tokenSP'));
    this.service = JSON.parse(sessionStorage.getItem('service'));
    this.getServiceProvider();
  }

  getServiceProvider() {
    // this.serviceProvider = this.serviceproviderService.getServiceProviderRequest(1);
    console.log(this.serviceProvider);
    console.log(this.serviceProvider.serviceProviderId);
    this.serviceproviderService.getServiceProviderRequest(this.serviceProvider.serviceProviderId).subscribe(
      (res) => {
        this.serviceProvider = res;
        console.log(this.serviceProvider);
        this.pageLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addToCart(service: Service) {
    localStorage.removeItem('card');
    this.cartList.push(service);
    localStorage.setItem('cart', JSON.stringify(this.cartList));
    console.log(localStorage.getItem('cart'));
  }

  addService() {
    const dialogRef = this.dialog.open(AddServiceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
