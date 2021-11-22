import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account-circle',
  templateUrl: './account-circle.component.html',
  styleUrls: ['./account-circle.component.scss'],
})
export class AccountCircleComponent implements OnInit {
  @Input() image;

  @Output() changeEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  callParent($event) {
    this.changeEvent.emit($event);
  }
}
