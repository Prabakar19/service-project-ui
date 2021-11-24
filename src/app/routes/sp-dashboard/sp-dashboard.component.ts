import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { AddServiceComponent } from './add-service/add-service.component';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/state/state';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { getSP } from './state/sp-dashboard.actions';
import { takeUntil } from 'rxjs/operators';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { geSP } from './state/sp-dashboard.selectors';

@Component({
  selector: 'app-sp-dashboard',
  templateUrl: './sp-dashboard.component.html',
  styleUrls: ['./sp-dashboard.component.scss'],
})
export class SPDashboardComponent implements OnInit {
  service: Service;
  cartList: Service[] = [];

  serviceProvider: ServiceProvider;

  serviceProvider$: Observable<ServiceProvider>;
  private unsubscribe$ = new Subject<void>();
  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.serviceProvider$ = this.store.select(geSP);
  }

  ngOnInit(): void {
    this.serviceProvider = JSON.parse(localStorage.getItem('tokenSP'));
    this.getServiceProvider();
  }

  getServiceProvider() {
    const serviceProviderId = this.serviceProvider.serviceProviderId;
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(getSP({ serviceProviderId }));
    this.serviceProvider$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.serviceProvider = res;
    });
  }

  addService() {
    const dialogRef = this.dialog.open(AddServiceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
