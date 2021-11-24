import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/models/service';
import { Category } from 'src/app/models/category';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/state';
import { setLoading } from 'src/app/state/shared/shared.actions';

import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { editService, loadCategory } from '../state/sp-dashboard.actions';
import { getCategory } from '../state/sp-dashboard.selectors';

@Component({
  selector: 'app-modify-service',
  templateUrl: './modify-service.component.html',
  styleUrls: ['./modify-service.component.scss'],
})
export class ModifyServiceComponent implements OnInit {
  errorMessage = '';
  discountCheck: boolean = false;
  selectedFile: File;
  category: Category[];
  categoryNameList: string[];

  categoryList$: Observable<Category[]>;
  private unsubscribe$ = new Subject<void>();

  modifyServiceForm = this.fb.group({
    cost: [this.serviceData.cost, [Validators.required]],
    discount: [this.serviceData.discount, []],
    discountAvailability: [this.serviceData.discountAvailability, []],
    details: [this.serviceData.details, [Validators.required]],
    warranty: [this.serviceData.warranty, [Validators.required]],
    categoryId: [this.serviceData.categoryId, [Validators.required]],
  });

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModifyServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public serviceData: Service
  ) {
    this.categoryList$ = this.store.select(getCategory);
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.toggle();
    console.log(this.serviceData);
  }

  getAllCategories() {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loadCategory());
    this.categoryList$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.category = res;
      this.categoryNameList = this.category.map((cat) => cat.categoryName);
    });
  }

  modifyService() {
    if (this.modifyServiceForm.valid) {
      const service = { ...this.serviceData, ...this.modifyServiceForm.value };
      service.serviceProviderId = this.serviceData.serviceProviderId;
      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(editService({ service, serviceId: service.serviceId }));
      this.modifyServiceForm.reset;
    }
  }

  toggle() {
    if (this.discountCheck) {
      this.modifyServiceForm.controls['discount'].enable();
    } else {
      this.modifyServiceForm.controls['discount'].disable();
    }
    this.discountCheck = !this.discountCheck;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('imagefile', this.selectedFile, this.selectedFile.name);
    this.http.post('api/service/image/' + this.serviceData.serviceId, uploadData).subscribe((res) => {});
  }
}
