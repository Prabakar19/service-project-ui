import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
})
export class ServiceCardComponent implements OnInit {
  @Input('service')
  service: Service;
  @Input('description')
  description: string;
  @Input('button')
  button: boolean;

  @Output() clickEvent = new EventEmitter<string>();

  cartAddedVisible: boolean = false;
  serviceProvider: ServiceProvider;
  retrievedImage: any;

  calculatedCost: number;
  constructor(private serviceProviderService: ServiceProviderService) {}

  ngOnInit(): void {
    this.retrievedImage = 'data:image/jpeg;base64,' + this.service.servicePic;
  }

  calculateCost(cost: number, discount: number): number {
    return cost - (discount / 100) * cost;
  }

  callParent(): void {
    this.cartAddedVisible = true;
    this.clickEvent.next('someEvent');
  }
}
