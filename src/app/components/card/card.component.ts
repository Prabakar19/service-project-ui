import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input('title') title: string;
  @Input('cost') cost: number;
  @Input('discountedCost') discountedCost: number;
  @Input('description') description: string;
  @Input('warranty') warranty: number;

  @Output() clickEvent: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  callParent() {
    this.clickEvent.emit('someEvent');
  }
}
