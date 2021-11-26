import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ServiceProvider } from 'src/app/models/service-provider';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import { AppState } from 'src/app/state/state';
import { getServiceProvider } from 'src/app/routes/manage-customers/state/manage.customers.selectors';
import { takeUntil } from 'rxjs/operators';
import { getSP, udpateTransStatus } from './state/manage.customers.actions';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { Billing } from 'src/app/models/billing';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
})
export class ManageCustomersComponent implements OnInit {
  filteredBills: Billing[];
  completeBillings: any;
  billings: Array<any>;
  temp: any;
  totalRecords: number;
  serviceProvider: ServiceProvider;
  selectedToggle = 'ongoing';
  spId = 1;

  serviceProvider$: Observable<ServiceProvider>;
  billings$: Observable<Billing[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, private serviceProviderService: ServiceProviderService) {
    this.serviceProvider$ = this.store.select(getServiceProvider);
  }

  ngOnInit(): void {
    this.serviceProvider = JSON.parse(localStorage.getItem('tokenSP'));
    this.getServiceProviderBills();
  }

  //TODO: understand this logic and make it better
  filterBillings() {
    const tempBill = [];

    this.completeBillings.forEach((bill) => {
      const temp = bill.transactions.filter((transaction) => transaction.status === this.selectedToggle);
      if (temp.length) {
        tempBill.push(bill);
      }
    });
    this.billings = tempBill.slice();
    this.billings.sort((a, b) => (a.billingId > b.billingId ? 1 : b.billingId > a.billingId ? -1 : 0));
  }

  changeTransStatus(selected) {
    const status = this.selectedToggle === 'ongoing' ? 'completed' : 'ongoing';

    // TODO: update multiple trancation status in single API call  - need to update backend
    selected._value.forEach((transId) => {
      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(udpateTransStatus({ transId, status }));
    });
  }

  selectedValueHandler(selectedValue: string) {
    this.selectedToggle = selectedValue;
    this.filterBillings();
  }

  getServiceProviderBills() {
    const serviceProviderId = this.serviceProvider.serviceProviderId;
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(getSP({ serviceProviderId }));
    this.serviceProvider$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (res) {
        this.temp = res;
        this.billings = res.billings;
        this.completeBillings = res.billings;
        this.filterBillings();
        this.totalRecords = this.billings.length;
      }
    });
  }
}
