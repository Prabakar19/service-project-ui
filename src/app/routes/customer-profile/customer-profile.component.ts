import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { CustomerServices } from 'src/app/services/customer-service/customer.service';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  pageLoaded: boolean = true;
  customer: Customer;
  address;
  selectedFile: File;
  retrievedImage: any;
  errorMessage = '';

  updationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[a-zA-Z].*[\\s.]*$')]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern('[a-zA-Z]+')]],
    emailId: ['', [Validators.email, Validators.required]],
    phoneNum: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  addressForm = this.fb.group({
    houseAddress: ['', [Validators.required]],
    area: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required, Validators.pattern('[a-zA-Zs]+')]],
    pincode: ['', [Validators.required, Validators.pattern('^\\d{5}[0-9]+')]],
  });

  constructor(private customerService: CustomerServices, private fb: FormBuilder, public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.customer = JSON.parse(localStorage.getItem('token'));
    this.retrievedImage = this.customer.customerPic;

    this.addCustomerToForm();
    this.addAddressToForm();
  }

  addCustomerToForm() {
    this.updationForm.setValue({
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      emailId: this.customer.emailId,
      phoneNum: this.customer.phoneNum,
      password: '*******',
    });

    this.updationForm.controls['firstName'].disable();
    this.updationForm.controls['lastName'].disable();
    this.updationForm.controls['emailId'].disable();
    this.updationForm.controls['phoneNum'].disable();
    this.updationForm.controls['password'].disable();
  }

  addAddressToForm() {
    // console.log(this.customer);
    this.addressForm.setValue({
      houseAddress: this.customer.address.houseAddress,
      area: this.customer.address.area,
      city: this.customer.address.city,
      state: this.customer.address.state,
      country: this.customer.address.country,
      pincode: this.customer.address.pincode,
    });

    this.addressForm.controls['houseAddress'].disable();
    this.addressForm.controls['area'].disable();
    this.addressForm.controls['city'].disable();
    this.addressForm.controls['state'].disable();
    this.addressForm.controls['country'].disable();
    this.addressForm.controls['pincode'].disable();
  }
  openDialog(value) {
    if (value === 'password') {
      const dialogRef = this.dialog.open(EditCustomerComponent, {
        height: '400px',
        data: '',
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.customer[value] = result;
        this.updationForm.controls[value] = result;
      });
    } else {
      const dialogRef = this.dialog.open(EditCustomerComponent, {
        height: '200px',
        data: this.customer[value],
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.customer[value] = result;

        this.updateCustomer(this.customer);
        this.updationForm.controls[value] = result;
      });
    }
  }
  openDialog1(value) {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      height: '200px',
      data: this.customer.address[value],
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.customer.address[value] = result;

      // console.log(this.customer.address);
      this.updateAddress(this.customer.address);

      this.addressForm.controls[value] = result;
      // console.log(this.updationForm.controls[value]);
      // console.log('The dialog was closed');
    });
  }

  updateCustomer(cust) {
    this.customerService.updateCustomerRequest(cust, this.customer.customerId).subscribe(
      (res) => {
        this.customer = res;
        localStorage.setItem('token', JSON.stringify(this.customer));
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateAddress(addr) {
    console.log(addr);
    this.customerService.updateAddressRequest(addr, this.customer.address.addressId).subscribe(
      (res) => {
        console.log(res);
        this.customer.address = res;
        localStorage.setItem('token', JSON.stringify(this.customer));
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('imagefile', this.selectedFile, this.selectedFile.name);
    this.uploadImage(uploadData);
  }

  uploadImage(uploadData) {
    this.customerService.uploadImageRequest(uploadData, this.customer.customerId).subscribe(
      (res) => {
        this.customer = res;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.customer.customerPic;

        this.customer.customerPic = this.retrievedImage;
        localStorage.setItem('token', JSON.stringify(this.customer));
        this.errorMessage = '';
      },
      (err) => {
        console.log(err);
        this.errorMessage = 'Image is Too large';
      }
    );
  }
}
