import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/models/service';
import { Category } from 'src/app/models/category';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/state';
import { setLoading } from 'src/app/state/shared/shared.actions';

import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { editService, loadCategory } from '../../state/sp-dashboard.actions';
import { getCategory } from '../../state/sp-dashboard.selectors';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { getCities } from 'src/app/routes/customer-dashboard/state/customer-dashboard.selectors';
import { loadCities } from 'src/app/routes/customer-dashboard/state/customer-dashboard.actions';

@Component({
  selector: 'app-modify-service',
  templateUrl: './modify-service.component.html',
  styleUrls: ['./modify-service.component.scss'],
})
export class ModifyServiceComponent implements OnInit {
  errorMessage = '';
  isDiscountAvailable: boolean;
  selectedFile: File;
  category: Category[];
  categoryNameList: string[];
  cities = [];

  categoryList$: Observable<Category[]>;
  cities$: Observable<string[]>;
  private unsubscribe$ = new Subject<void>();

  modifyServiceForm = this.fb.group({
    cost: [this.serviceData.cost, [Validators.required]],
    discount: [this.serviceData.discount, []],
    discountAvailability: [this.serviceData.discountAvailability, []],
    details: [this.serviceData.details, [Validators.required]],
    warranty: [this.serviceData.warranty, [Validators.required]],
    categoryId: [this.serviceData.categoryId, [Validators.required]],
    city: [this.serviceData.city, [Validators.required]],
  });

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModifyServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public serviceData: Service,
    public dialog: MatDialog
  ) {
    this.categoryList$ = this.store.select(getCategory);
    this.cities$ = this.store.select(getCities);
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCities();
    this.isDiscountAvailable = this.serviceData.discountAvailability;
  }

  getAllCategories() {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loadCategory());
    this.categoryList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.category = res;
      this.categoryNameList = this.category.map((cat) => cat.categoryName);
    });
  }

  getAllCities() {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loadCities());
    this.cities$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (res && res.length != 0) {
        this.cities = res;
      }
    });
  }

  modifyService() {
    if (this.modifyServiceForm.valid) {
      const service = { ...this.serviceData, ...this.modifyServiceForm.value };
      service.serviceProviderId = this.serviceData.serviceProviderId;
      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(editService({ service, serviceId: service.serviceId }));
      this.modifyServiceForm.reset;
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: 'Error! All fields need to be filled',
      });
    }
  }

  toggle() {
    if (this.isDiscountAvailable) {
      this.modifyServiceForm.controls['discount'].enable();
    } else {
      this.modifyServiceForm.controls['discount'].disable();
    }
    this.isDiscountAvailable = !this.isDiscountAvailable;
  }

  // TODO: fix this file upload
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('imagefile', this.selectedFile, this.selectedFile.name);
    this.http.post('api/service/image/' + this.serviceData.serviceId, uploadData).subscribe((res) => {});
  }
}
