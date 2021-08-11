import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service: Service;
  @Input() description: string;
  @Input() button: boolean;
  @Output() clickEvent = new EventEmitter();

  cartAddedVisible = false;
  serviceProvider: ServiceProvider;
  retrievedImage: any;
  calculatedCost: number;

  ngOnInit(): void {
    this.retrievedImage = 'data:image/jpeg;base64,' + this.service.servicePic;
  }

  calculateCost(cost: number, discount: number): number {
    return cost - (discount / 100) * cost;
  }

  callParent(): void {
    this.cartAddedVisible = true;
    this.clickEvent.emit();
  }
}
