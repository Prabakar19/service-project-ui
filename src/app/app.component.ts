import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DialogComponent } from './components/dialog/dialog.component';
import { getErrorMessage, getLoader } from './state/shared/shared.selectors';
import { AppState } from './state/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.showLoading$ = this.store.select(getLoader);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  ngOnInit() {
    this.errorMessage$.subscribe((res) => {
      if (res) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: res,
        });
      }
    });
  }
}
