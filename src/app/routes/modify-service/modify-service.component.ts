import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerServices } from 'src/app/services/customer-service/customer.service';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service-service/service.service';
import { CategoryServiceService } from 'src/app/services/category-service/category-service.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-modify-service',
  templateUrl: './modify-service.component.html',
  styleUrls: ['./modify-service.component.css'],
})
export class ModifyServiceComponent implements OnInit {
  service: Service;
  errorMessage: string = '';
  hide: boolean;
  discountCheck: boolean = false;

  selectedFile: File;

  category: Category[];
  categoryNameList: string[];

  spServiceId: number;

  modifyServiceForm = this.fb.group({
    cost: ['', []],
    discount: ['', []],
    discountAvailability: ['', []],
    details: ['', []],
    warranty: ['', []],
    categoryId: ['', []],
  });

  constructor(
    private serviceService: ServiceService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.spServiceId = JSON.parse(sessionStorage.getItem('spServiceId'));
    this.getAllCategories();
    this.toggle();
  }

  modifyService() {
    if (this.modifyServiceForm.valid) {
      this.serviceService.modifyServiceRequest(this.modifyServiceForm.value, this.spServiceId).subscribe(
        (res) => {
          this.service = res;
          this.modifyServiceForm.reset;
          localStorage.setItem('isLoggedInSP', 'true');
          localStorage.setItem('tokenSP', JSON.stringify(this.service));
        },
        (error) => {
          if (typeof error.error == typeof 'string') this.errorMessage = error.error;
        }
      );
      window.location.reload();
    } else {
      console.log('Form Not validated');
    }
  }

  getAllCategories() {
    this.categoryService.getCategoryListRequest().subscribe(
      (res) => {
        this.category = res;
        this.categoryNameList = this.category.map((cat) => cat.categoryName);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggle() {
    if (this.discountCheck) {
      this.modifyServiceForm.controls['discount'].enable();
    } else {
      this.modifyServiceForm.controls['discount'].disable();
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
    this.http.post('api/service/image/' + this.spServiceId, uploadData).subscribe((res) => {});
  }
}
