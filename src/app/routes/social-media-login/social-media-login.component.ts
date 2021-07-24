import { HttpClient } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

const googleLogoURL =
  "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-social-media-login',
  templateUrl: './social-media-login.component.html',
  styleUrls: ['./social-media-login.component.css']
})
export class SocialMediaLoginComponent implements OnInit {
  auth2: any;

  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;



  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,

    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit(): void {
    this.googleSDK();
    this.fbLibrary();

  }

  prepareLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());



      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleSDK() {

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '331060380462-d27i3dlgau7nivh0n98p1cs9k1gqrijn.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }
  //fb
  fbLibrary() {

    (window as any).fbAsyncInit = function () {
      window['FB'].init({
        appId: '869805000070130',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  login() {

    window['FB'].login((response) => {
      console.log('login response', response);
      if (response.authResponse) {

        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
        }, (userInfo) => {

          console.log("user information");
          console.log(userInfo);
        });

      } else {
        console.log('User login failed');
      }
    }, { scope: 'email' });
  }




}
