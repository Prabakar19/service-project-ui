import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Service } from 'src/app/models/service';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { loadSelectedCategory } from '../customer-dashboard/state/customer-dashboard.actions';
import { getFilteredCategory } from '../customer-dashboard/state/customer-dashboard.selectors';
import { getCategory, loadServices } from './state/list-services.actions';
import { getSelectedCategory, getServiceList } from './state/list-services.selectors';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
})
export class ListServicesComponent implements OnInit {
  category: Category;
  categoryName: string;
  location: string;
  cost: number;
  servicesList: Array<any>;
  page: number;
  filteredList: Service[];

  key = 'serviceId';
  reverse = false;

  category$: Observable<Category>;
  serviceList$: Observable<any>;
  filteredCategory$: Observable<string[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {
    this.category$ = this.store.select(getSelectedCategory);
    this.serviceList$ = this.store.select(getServiceList);
  }

  ngOnInit(): void {
    this.categoryName = JSON.parse(sessionStorage.getItem('category'));
    this.location = JSON.parse(sessionStorage.getItem('location'));

    this.getServiceList();
    this.getCategoryList();
  }

  getServiceList() {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(getCategory({ categoryName: this.categoryName }));

    this.category$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.category = res;
      if (this.category) {
        this.store.dispatch(setLoading({ status: true }));
        this.store.dispatch(loadServices({ catId: this.category.categoryId, location: this.location }));
      }
    });

    this.serviceList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.servicesList = res;
      this.filteredList = cloneDeep(this.servicesList);
      this.calculateDiscountCost();
    });
  }

  getCategoryList() {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loadSelectedCategory({ cityName: this.location }));
    this.filteredCategory$ = this.store.select(getFilteredCategory);
  }

  calculateDiscountCost() {
    this.filteredList.map((service) => {
      service.discountedCost = Math.round(service.cost - service.discount * 0.01 * service.cost);
    });
  }

  selectedDataHandler(cat: string) {
    this.categoryName = cat;
    sessionStorage.setItem('category', JSON.stringify(cat));

    this.getServiceList();
  }

  sortBy(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  filterUnder(cost) {
    this.filteredList = this.servicesList.filter((service) => service.discountedCost <= cost);
  }
  filterAbove(cost) {
    this.filteredList = this.servicesList.filter((service) => service.discountedCost >= cost);
  }

  gotoCheckout(service: Service) {
    sessionStorage.setItem('service', JSON.stringify(service));
    this.router.navigateByUrl('/service');
  }
}
