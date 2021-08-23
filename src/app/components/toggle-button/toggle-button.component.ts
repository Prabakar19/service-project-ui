import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
})
export class ToggleButtonComponent implements OnInit {
  @Input() list;
  @Output() selectedValue = new EventEmitter();
  selectedVal: string;
  constructor() {}

  ngOnInit(): void {
    this.selectedVal = this.list[0];
  }

  onValChange(val: string) {
    this.selectedVal = val;
  }

  clickEvent(select: string) {
    this.selectedValue.emit(select);
  }
}
