import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() listData;

  @Output()
  selectedData: EventEmitter<string> = new EventEmitter();

  control = new FormControl();
  filteredData: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {
    this.filteredData = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.listData.filter((dat) => this._normalizeValue(dat).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  setValueForParent(data): void {
    console.log(data);
    this.selectedData.emit(data);
  }
}
