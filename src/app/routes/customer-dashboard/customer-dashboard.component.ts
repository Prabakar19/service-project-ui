import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Customer } from 'src/app/models/customer';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from '../../state/state';
import { getCategory, getCities, getFilteredCategory } from './state/customer-dashboard.selectors';
import { loadCategory, loadCities, loadSelectedCategory } from './state/customer-dashboard.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
})
export class CustomerDashboardComponent implements OnInit {
  selectedLocation: string;
  errorMessage: string;
  categoryNameList: string[];
  cities: string[];
  customer: Customer;
  title = 'City';
  localtionSelect = false;
  bestOffers = ['', '', ''];

  categoryList$: Observable<Category[]>;
  cities$: Observable<string[]>;
  filteredCategory$: Observable<string[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {
    this.categoryList$ = this.store.select(getCategory);
    this.cities$ = this.store.select(getCities);
  }

  ngOnInit(): void {
    this.customer = JSON.parse(sessionStorage.getItem('token'));
    this.getAllCategories();
    this.store.dispatch(loadCities());
  }

  getAllCategories(): void {
    this.store.dispatch(loadCategory());
    this.categoryList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.categoryNameList = res.map((cat) => cat.categoryName);
    });
  }

  goListPage(cat: string): void {
    if (!this.selectedLocation) {
      this.errorMessage = 'please select the location!!';
    } else {
      sessionStorage.setItem('category', JSON.stringify(cat));
      sessionStorage.setItem('location', JSON.stringify(this.selectedLocation));
      this.router.navigateByUrl('/cust-services');
    }
  }

  selectEventHandler(selected): void {
    this.errorMessage = '';
    this.selectedLocation = selected;
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loadSelectedCategory({ cityName: selected }));
    this.filteredCategory$ = this.store.select(getFilteredCategory);

    this.filteredCategory$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.categoryNameList = res;
    });
  }
}
