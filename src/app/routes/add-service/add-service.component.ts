import { Component, OnInit, Inject } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerServices } from 'src/app/services/customerService/customer.service';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service-service/service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryServiceService } from 'src/app/services/category-service/category-service.service';
import { Category } from 'src/app/models/category';
import { ServiceProvider } from 'src/app/models/service-provider';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent implements OnInit {
  service: Service;
  service2: Service;
  errorMessage: string = '';
  hide: boolean;

  serviceProvider: ServiceProvider;
  selectedFile: File;

  category: Category[];
  categoryNameList: string[];
  pageLoaded: boolean = false;
  discountCheck: boolean = false;

  addServiceForm = this.fb.group({
    serviceName: ['', [Validators.required]],
    cost: ['', [Validators.required]],
    discount: ['', []],
    //serviceProviderId: ['', [Validators.required]],
    discountAvailability: ['', []],
    details: ['', [Validators.required]],
    warranty: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
  });
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceService: ServiceService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.serviceProvider = JSON.parse(localStorage.getItem('tokenSP'));
    this.getAllCategories();
    this.toggle();
  }

  addService() {
    if (this.addServiceForm.valid) {
      this.service2 = this.addServiceForm.value;
      console.log(this.service2);
      this.service2.serviceProviderId = this.serviceProvider.serviceProviderId;
      console.log(this.service2);
      this.serviceService.addServiceRequest(this.addServiceForm.value).subscribe(
        (res) => {
          this.service = res;
          this.addServiceForm.reset;
          localStorage.setItem('token', JSON.stringify(this.service));
          localStorage.setItem('cart', JSON.stringify([]));
          this.service2.serviceId = this.service.serviceId;
        },
        (error) => {
          if (typeof error.error == typeof 'string') this.errorMessage = error.error;
        }
      );
      window.location.reload();
    }
  }

  getAllCategories() {
    this.categoryService.getCategoryListRequest().subscribe(
      (res) => {
        this.category = res;
        this.categoryNameList = this.category.map((cat) => cat.categoryName);
        this.pageLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggle() {
    if (this.discountCheck) {
      this.addServiceForm.controls['discount'].enable();
    } else {
      this.addServiceForm.controls['discount'].disable();
    }
    this.discountCheck = !this.discountCheck;
    console.log(this.discountCheck);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('imagefile', this.selectedFile, this.selectedFile.name);
    this.http.post('api/service/image/' + this.service2.serviceId, uploadData).subscribe((res) => {});
  }
}
