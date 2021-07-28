import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent } from './routes/cart-page/cart-page.component';
import { CheckoutPageComponent } from './routes/checkout-page/checkout-page.component';
import { CustomerDashboardComponent } from './routes/customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './routes/customer-profile/customer-profile.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ListServicesPageComponent } from './routes/list-services-page/list-services-page.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { MyBookingPageComponent } from './routes/my-booking-page/my-booking-page.component';
import { RegistrationSpComponent } from './routes/auth/spregister/spregister.component';
import { RegisterationComponent } from './routes/auth/register/register.component';
import { ManageCustomersComponent } from './routes/manage-customers/manage-customers.component';
import { SpReportComponent } from './routes/sp-report/sp-report.component';
import { AuthGuard } from './Guards/auth.guard';
import { from } from 'rxjs';
import { ServiceProviderDashboardComponent } from './routes/service-provider-dashboard/service-provider-dashboard.component';
import { AddServiceComponent } from './routes/add-service/add-service.component';
import { ModifyServiceComponent } from './routes/modify-service/modify-service.component';
import { DeleteServiceComponent } from './routes/delete-service/delete-service.component';
import { SocialMediaLoginComponent } from './routes/social-media-login/social-media-login.component';
import { SPLoginComponent } from './routes/auth/splogin/splogin-component';
import { AuthguardspGuard } from './Guards/authguardsp.guard';
import { SpProfileComponent } from './routes/sp-profile/sp-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'register', component: RegisterationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'spregister', component: RegistrationSpComponent },

  { path: 'spreport', component: SpReportComponent },
  { path: 'addservice', component: AddServiceComponent },
  { path: 'modifyservice', component: ModifyServiceComponent },
  { path: 'deleteservice', component: DeleteServiceComponent },
  { path: 'sociallogin', component: SocialMediaLoginComponent },
  { path: 'splogin', component: SPLoginComponent },
  {
    path: 'customerdashboard',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'spmanage',
    component: ManageCustomersComponent,
    canActivate: [AuthguardspGuard],
  },
  {
    path: 'spdashboard',
    component: ServiceProviderDashboardComponent,
    canActivate: [AuthguardspGuard],
  },

  {
    path: 'serviceproviderdashboard',
    component: ServiceProviderDashboardComponent,
    canActivate: [AuthguardspGuard],
  },
  {
    path: 'customerServices',
    component: ListServicesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mybooking',
    component: MyBookingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: CustomerProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'spprofile',
    component: SpProfileComponent,
    canActivate: [AuthguardspGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
