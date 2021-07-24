import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceProvider } from 'src/app/models/service-provider';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';

const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';

@Component({
  selector: 'app-service-provider-login-component',
  templateUrl: './service-provider-login-component.component.html',
  styleUrls: ['./service-provider-login-component.component.css'],
})
export class SPLoginComponentComponent implements OnInit {
  serviceProvider: Partial<ServiceProvider> = {};
  errorMessage: string = '';
  hide: boolean;

  loginForm = this.fb.group({
    emailId: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  auth2: any;

  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;

  constructor(
    private serviceProviderService: ServiceProviderService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,

    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private ngZone: NgZone
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

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.serviceProviderService
        .serviceProviderLoginRequest(this.loginForm.value)
        .subscribe(
          (res) => {
            this.serviceProvider = res;

            this.loginForm.reset;
            localStorage.setItem('isLoggedInSP', 'true');
            localStorage.setItem(
              'tokenSP',
              JSON.stringify(this.serviceProvider)
            );
            this.router.navigateByUrl('/spdashboard');

            // this.loginForm.reset;
            // this.router.navigateByUrl('/serviceproviderdashboard');
          },
          (error) => {
            if (typeof error.error == typeof 'string')
              this.errorMessage = error.error;
            else {
              this.serviceProvider = error.error;
              console.log(this.serviceProvider);
            }
          }
        );
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

        this.ngZone.run(() =>
          this.serviceProviderService
            .serviceProviderLoginRequest(this.serviceProvider)
            .subscribe(
              (res) => {
                this.serviceProvider = res;

                this.loginForm.reset;
                localStorage.setItem('isLoggedInSP', 'true');
                localStorage.setItem(
                  'tokenSP',
                  JSON.stringify(this.serviceProvider)
                );
                this.router.navigateByUrl('/spdashboard');

                // this.loginForm.reset;
                // this.router.navigateByUrl('/serviceproviderdashboard');
              },
              (error) => {
                if (typeof error.error == typeof 'string')
                  this.errorMessage = error.error;
                else {
                  this.serviceProvider = error.error;
                  console.log(this.serviceProvider);
                }
              }
            )
        );
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
