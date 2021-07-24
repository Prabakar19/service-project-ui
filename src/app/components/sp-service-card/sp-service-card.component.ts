import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ModifyServiceComponent } from 'src/app/routes/modify-service/modify-service.component';
import { DeleteServiceComponent } from 'src/app/routes/delete-service/delete-service.component';

@Component({
  selector: 'app-sp-service-card',
  templateUrl: './sp-service-card.component.html',
  styleUrls: ['./sp-service-card.component.css'],
})
export class SpServiceCardComponent implements OnInit {
  @Input('service')
  service: Service;
  @Input('description')
  description: string;
  @Input('button')
  button: boolean;
  retrievedImage: string;

  @Output() clickEvent = new EventEmitter<string>();

  cartAddedVisible: boolean = false;
  serviceProvider: ServiceProvider;

  serviceId: number;

  calculatedCost: number;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.retrievedImage = 'data:image/jpeg;base64,' + this.service.servicePic;
  }

  calculateCost(cost: number, discount: number): number {
    return cost - (discount / 100) * cost;
  }

  editService(serviceId) {
    sessionStorage.setItem('spServiceId', serviceId);
    const dialogRef = this.dialog.open(ModifyServiceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteService(serviceId) {
    sessionStorage.setItem('spServiceId', serviceId);
    const dialogRef = this.dialog.open(DeleteServiceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
