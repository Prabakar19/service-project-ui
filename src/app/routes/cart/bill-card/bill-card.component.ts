import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
})
export class BillCardComponent implements OnInit {
  @Input() details: Service[];
  @Input() tax: any;
  @Output() clickEvent = new EventEmitter();

  ngOnInit(): void {}

  calculateTotal() {
    let totalCost = 0;
    this.details.map((service) => (totalCost += service.discountedCost));
    return Math.round(totalCost + this.tax * 0.01 * totalCost);
  }

  callParent() {
    this.clickEvent.emit();
  }
}
