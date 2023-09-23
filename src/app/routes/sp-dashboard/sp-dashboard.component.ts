import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { AddServiceComponent } from './add-service/add-service.component';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/state/state';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { getSP, getServiceList } from './state/sp-dashboard.actions';
import { takeUntil } from 'rxjs/operators';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { getServiceProvider, getSpServices } from './state/sp-dashboard.selectors';

@Component({
  selector: 'app-sp-dashboard',
  templateUrl: './sp-dashboard.component.html',
  styleUrls: ['./sp-dashboard.component.scss'],
})
export class SPDashboardComponent implements OnInit {
  service: Service;
  serviceList: Service[];

  serviceProvider: ServiceProvider;

  serviceProvider$: Observable<ServiceProvider>;
  serviceList$: Observable<Service[]>;

  private unsubscribe$ = new Subject<void>();
  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.serviceProvider$ = this.store.select(getServiceProvider);
    this.serviceList$ = this.store.select(getSpServices);
  }

  ngOnInit(): void {
    this.serviceProvider = JSON.parse(localStorage.getItem('tokenSP'));
    this.getServiceProvider();
    this.getServiceList();
  }

  getServiceProvider() {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(getSP({ serviceProviderId: this.serviceProvider.serviceProviderId }));
    this.serviceProvider$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (res) {
        this.serviceProvider = res;
      }
    });
  }

  getServiceList() {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(getServiceList({ serviceProviderId: this.serviceProvider.serviceProviderId }));
    this.serviceList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (res && res.length != 0) {
        this.serviceList = res;
      }
    });
  }

  addService() {
    const dialogRef = this.dialog.open(AddServiceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
