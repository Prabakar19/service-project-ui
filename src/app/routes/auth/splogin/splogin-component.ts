import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ServiceProvider } from 'src/app/models/service-provider';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { spLogin } from '../state/auth.actions';
import { getServiceProvider } from '../state/auth.selectors';

@Component({
  selector: 'app-splogin-component',
  templateUrl: './splogin-component.html',
  styleUrls: ['./splogin-component.scss'],
})
export class SPLoginComponent implements OnInit {
  serviceProvider: ServiceProvider;
  errorMessage: string = '';
  hide: boolean;

  serviceProvider$: Observable<ServiceProvider>;

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
      this.store.dispatch(spLogin({ emailId, password }));
      this.serviceProvider$ = this.store.select(getServiceProvider);

      this.serviceProvider$.subscribe((res) => {
        this.serviceProvider = res;
        this.loginForm.reset;
        localStorage.setItem('isLoggedInSP', 'true');
        localStorage.setItem('tokenSP', JSON.stringify(this.serviceProvider));
      });
    }
  }
}
