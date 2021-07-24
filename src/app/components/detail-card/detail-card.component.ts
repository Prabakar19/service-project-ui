import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css'],
})
export class DetailCardComponent implements OnInit {
  @Input('details') details: Service[];

  title: string = 'Check Out';

  @Input('description') description: string;
  @Input('cost') cost: number;
  @Input('discount') discount: number;
  @Input('warranty') warranty: number;
  @Input('tax') tax: any;

  @Output() clickEvent: EventEmitter<string> = new EventEmitter();
  pageLoaded: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.cleanData();
  }

  cleanData() {
    this.tax = this.tax ? this.tax : 0;
    this.discount = this.discount ? this.discount : 0;
    this.warranty = this.warranty ? this.warranty : 0;
    this.pageLoaded = true;
  }
  calculateTotal() {
    let totalCost = 0;
    for (let i = 0; i < this.details.length; i++)
      totalCost += this.details[i].discountedCost;

    return Math.round(totalCost + this.tax * 0.01 * totalCost);
  }

  callParent() {
    this.clickEvent.emit('event');
  }
}
