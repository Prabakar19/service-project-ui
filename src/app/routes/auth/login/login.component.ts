import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from '../../../state/state';
import { custLogin } from '../state/auth.actions';
import { getCustomer } from '../state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  customer: Customer;
  errorMessage: string;
  hide: boolean;

  customer$: Observable<Customer>;
  private unsubscribe$ = new Subject<void>();

  loginForm = this.fb.group({
    emailId: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const emailId = this.loginForm.get('emailId').value;
      const password = this.loginForm.get('password').value;

      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(custLogin({ emailId, password }));
      this.customer$ = this.store.select(getCustomer);

      this.customer$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
        this.customer = res;
        this.loginForm.reset;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', JSON.stringify(this.customer));
        localStorage.setItem('cart', JSON.stringify([]));
      });
    }
  }
}
