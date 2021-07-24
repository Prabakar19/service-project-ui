import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { addCustomerAddress, custRegister } from '../state/auth.actions';
import { getCustomer } from '../state/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterationComponent implements OnInit {
  hide: boolean;
  customer: Customer;
  errorMessage = '';
  toggle = false;

  customer$: Observable<Customer>;

  registrationForm = this.fb.group({
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

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {}

  addCustomer() {
    if (this.registrationForm.valid) {
      this.customer = this.registrationForm.value;
      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(custRegister({ customer: this.customer }));
      this.customer$ = this.store.select(getCustomer);

      this.customer$.subscribe((res) => {
        this.customer = res;
        this.registrationForm.reset;
        this.toggle = true;
      });
    }
  }

  addCustomerAddress() {
    if (this.addressForm.valid) {
      const address = this.addressForm.value;

      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(addCustomerAddress({ address, customerId: this.customer.customerId }));
      this.customer$ = this.store.select(getCustomer);

      this.customer$.subscribe((res) => {
        this.customer = res;
        this.addressForm.reset;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', JSON.stringify(this.customer));
        localStorage.setItem('cart', JSON.stringify([]));
      });
    }
  }
}
