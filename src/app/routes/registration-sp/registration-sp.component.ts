import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Observable } from 'rxjs';
import { ServiceProvider } from 'src/app/models/service-provider';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';

@Component({
  selector: 'app-registration-sp',
  templateUrl: './registration-sp.component.html',
  styleUrls: ['./registration-sp.component.css'],
})
export class RegistrationSpComponent implements OnInit {
  serviceProvider: Partial<ServiceProvider> = {};
  errorMessage: string = '';
  toggle: boolean = false;
  address: Address;

  auth2: any;

  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;

  registrationSpForm = this.fb.group({
    companyName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z].*[\\s.]*$'),
      ],
    ],
    ownerName: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z]+'),
      ],
    ],
    emailId: ['', [Validators.email, Validators.required]],
    phoneNum: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  addressForm = this.fb.group({
    addressLine: ['', [Validators.required]],
    area: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required, Validators.pattern('[a-zA-Zs]+')]],
    pincode: ['', [Validators.required, Validators.pattern('^\\d{5}[0-9]+')]],
  });

  constructor(
    private serviceProviderService: ServiceProviderService,
    private fb: FormBuilder,
    private router: Router,

    private http: HttpClient,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)
    );
  }

  ngOnInit(): void {
    this.googleSDK();
  }

  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id:
            '331060380462-d27i3dlgau7nivh0n98p1cs9k1gqrijn.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        });
        this.prepareLoginButton();
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  }

  addServiceProvider() {
    if (this.registrationSpForm.valid) {
      this.serviceProvider = this.registrationSpForm.value;
      this.serviceProviderService
        .addServiceProviderRequest(this.serviceProvider)
        .subscribe(
          (res) => {
            this.toggle = !this.toggle;
            this.serviceProvider = res;
            console.log(this.serviceProvider);
            this.registrationSpForm.reset;
          },
          (error) => {
            this.errorMessage =
              'service-provider already exist with these details';
          }
        );
    }
  }

  addServiceProviderAddress() {
    if (this.addressForm.valid) {
      this.address = this.addressForm.value;
      this.serviceProviderService
        .addServiceProviderAddressReq(
          this.address,
          this.serviceProvider.serviceProviderId
        )
        .subscribe((res) => {
          this.address = res;
          console.log(this.address);
          this.addressForm.reset;
          this.router.navigateByUrl('/login');
        });
    }
  }

  prepareLoginButton() {
    this.auth2.attachClickHandler(
      this.loginElement.nativeElement,
      {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        this.serviceProvider.password = profile.getId();
        this.serviceProvider.ownerName = profile.getName();
        this.serviceProvider.emailId = profile.getEmail();

        this.serviceProviderService
          .addServiceProviderRequest(this.serviceProvider)
          .subscribe(
            (res) => {
              this.toggle = !this.toggle;
              this.serviceProvider = res;
              console.log(this.serviceProvider);
              this.registrationSpForm.reset;
            },
            (error) => {
              this.errorMessage =
                'service-provider already exist with these details';
            }
          );
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
