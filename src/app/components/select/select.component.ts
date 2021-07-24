import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() data;

  @Input() title;

  @Output()
  selectedItem: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setSelectedValueForParent(selected): void {
    this.selectedItem.emit(selected);
  }
}
