import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category';
import { ServiceProvider } from 'src/app/models/service-provider';
import { AppState } from 'src/app/state/state';
import { Store } from '@ngrx/store';
import { geSP, getCategory } from '../state/sp-dashboard.selectors';
import { addService, loadCategory } from '../state/sp-dashboard.actions';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {
  errorMessage = '';
  serviceProvider: ServiceProvider;
  category: Category[];
  categoryNameList: string[];
  discountCheck = false;

  serviceProvider$: Observable<ServiceProvider>;
  categoryList$: Observable<Category[]>;
  private unsubscribe$ = new Subject<void>();

  addServiceForm = this.fb.group({
    serviceName: ['', [Validators.required]],
    cost: ['', [Validators.required]],
    discount: ['', []],
    discountAvailability: [false, []],
    details: ['', [Validators.required]],
    warranty: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
  });
  constructor(private store: Store<AppState>, private http: HttpClient, private fb: FormBuilder) {
    this.serviceProvider$ = this.store.select(geSP);
    this.categoryList$ = this.store.select(getCategory);
  }

  ngOnInit(): void {
    this.serviceProvider$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.serviceProvider = res;
    });
    this.getAllCategories();
    this.toggle();
  }

  getAllCategories() {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loadCategory());
    this.categoryList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.category = res;
      this.categoryNameList = this.category.map((cat) => cat.categoryName);
    });
  }

  addService() {
    if (this.addServiceForm.valid) {
      const service = this.addServiceForm.value;
      service.serviceProviderId = this.serviceProvider.serviceProviderId;
      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(addService({ service }));
      this.addServiceForm.reset;
    }
  }

  toggle() {
    if (this.discountCheck) {
      this.addServiceForm.controls.discount.enable();
    } else {
      this.addServiceForm.controls.discount.disable();
    }
    this.discountCheck = !this.discountCheck;
  }
}
