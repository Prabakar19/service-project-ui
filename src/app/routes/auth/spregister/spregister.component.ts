import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address';
import { ServiceProvider } from 'src/app/models/service-provider';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { addSPAddress, spRegister } from '../state/auth.actions';
import { getServiceProvider } from '../state/auth.selectors';

@Component({
  selector: 'app-spregister',
  templateUrl: './spregister.component.html',
  styleUrls: ['./spregister.component.scss'],
})
export class RegistrationSpComponent implements OnInit {
  serviceProvider: ServiceProvider;
  address: Address;
  errorMessage = '';
  toggle = false;

  serviceProvider$: Observable<ServiceProvider>;

  registrationSpForm = this.fb.group({
    companyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[a-zA-Z].*[\\s.]*$')]],
    ownerName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern('^[a-zA-Z].*[\\s.]*$')]],
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

  constructor(private store: Store<AppState>, private serviceProviderService: ServiceProviderService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  addServiceProvider() {
    if (this.registrationSpForm.valid) {
      this.serviceProvider = this.registrationSpForm.value;
      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(spRegister({ serviceProvider: this.serviceProvider }));
      this.serviceProvider$ = this.store.select(getServiceProvider);

      this.serviceProvider$.subscribe((res) => {
        this.serviceProvider = res;
        this.registrationSpForm.reset;
        this.toggle = true;
      });
    }
  }

  addServiceProviderAddress() {
    if (this.addressForm.valid) {
      const serviceAddress = this.addressForm.value;
      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(addSPAddress({ serviceAddress, spId: this.serviceProvider.serviceProviderId }));

      this.serviceProvider$.subscribe((res) => {
        this.serviceProvider = res;
        this.addressForm.reset;
        localStorage.setItem('isLoggedInSP', 'true');
        localStorage.setItem('tokenSP', JSON.stringify(this.serviceProvider));
      });
      //   this.serviceProviderService.addServiceProviderAddressReq(this.address, this.serviceProvider.serviceProviderId).subscribe((res) => {
      //     this.serviceProvider = res;
      //     this.addressForm.reset;
      //   });
    }
  }
}
