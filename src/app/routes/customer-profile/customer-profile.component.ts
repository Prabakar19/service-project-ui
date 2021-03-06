import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { CustomerServices } from 'src/app/services/customer-service/customer.service';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { setCustomer, updateCust, updateCustAddress } from '../auth/state/auth.actions';
import { getCustomer } from '../auth/state/auth.selectors';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss'],
})
export class CustomerProfileComponent implements OnInit {
  customer: Customer;
  selectedFile: File;
  retrievedImage: any;
  errorMessage = '';

  customer$: Observable<Customer>;
  private unsubscribe$ = new Subject<void>();

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

  constructor(
    private customerService: CustomerServices,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.customer$ = this.store.select(getCustomer);
  }

  ngOnInit(): void {
    this.customer = JSON.parse(localStorage.getItem('token'));
    this.store.dispatch(setCustomer({ customer: this.customer }));
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

    this.updationForm.controls.firstName.disable();
    this.updationForm.controls.lastName.disable();
    this.updationForm.controls.emailId.disable();
    this.updationForm.controls.phoneNum.disable();
    this.updationForm.controls.password.disable();
  }

  addAddressToForm() {
    this.addressForm.setValue({
      houseAddress: this.customer.address.houseAddress,
      area: this.customer.address.area,
      city: this.customer.address.city,
      state: this.customer.address.state,
      country: this.customer.address.country,
      pincode: this.customer.address.pincode,
    });

    this.addressForm.controls.houseAddress.disable();
    this.addressForm.controls.area.disable();
    this.addressForm.controls.city.disable();
    this.addressForm.controls.state.disable();
    this.addressForm.controls.country.disable();
    this.addressForm.controls.pincode.disable();
  }

  openDialog(value) {
    if (value === 'password') {
      const dialogRef = this.dialog.open(EditCustomerComponent, {
        height: 'auto',
        data: '',
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.customer[value] = result;
        this.updationForm.controls[value] = result;
      });
    } else {
      const dialogRef = this.dialog.open(EditCustomerComponent, {
        height: 'auto',
        data: this.customer[value],
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const cust = { ...this.customer };
          cust[value] = result;
          this.customer = cust;
          this.updateCustomer(this.customer);
          this.updationForm.controls[value] = result;
        }
      });
    }
  }

  openDialogAddr(value) {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      height: 'auto',
      data: this.customer.address[value],
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const cust = cloneDeep(this.customer);
        cust.address[value] = result;
        this.customer = cust;
        this.updateAddress(this.customer.address);
        this.addressForm.controls[value] = result;
      }
    });
  }

  updateCustomer(cust) {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(updateCust({ customer: cust }));
    this.customer$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.customer = res;
      localStorage.setItem('token', JSON.stringify(this.customer));
    });
  }

  updateAddress(addr) {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(updateCustAddress({ address: addr, addressId: addr.addressId }));
    this.customer$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.customer = res;
      localStorage.setItem('token', JSON.stringify(this.customer));
    });
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
