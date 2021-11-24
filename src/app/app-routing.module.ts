import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent } from './routes/cart/cart.component';
import { ServiceComponent } from './routes/list-services/service-view/service.component';
import { CustomerDashboardComponent } from './routes/customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './routes/customer-profile/customer-profile.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ListServicesComponent } from './routes/list-services/list-services.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { BookingComponent } from './routes/booking/booking.component';
import { RegistrationSpComponent } from './routes/auth/spregister/spregister.component';
import { RegisterationComponent } from './routes/auth/register/register.component';
import { ManageCustomersComponent } from './routes/manage-customers/manage-customers.component';
import { SpReportComponent } from './routes/sp-report/sp-report.component';
import { AuthGuard } from './guards/auth.guard';
import { SPDashboardComponent } from './routes/sp-dashboard/sp-dashboard.component';
import { AddServiceComponent } from './routes/sp-dashboard/add-service/add-service.component';
import { ModifyServiceComponent } from './routes/sp-dashboard/modify-service/modify-service.component';
import { DeleteServiceComponent } from './routes/sp-dashboard/delete-service/delete-service.component';
import { SocialMediaLoginComponent } from './routes/social-media-login/social-media-login.component';
import { SPLoginComponent } from './routes/auth/splogin/splogin-component';
import { AuthguardspGuard } from './guards/authguardsp.guard';
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
    component: SPDashboardComponent,
    canActivate: [AuthguardspGuard],
  },
  {
    path: 'cust-services',
    component: ListServicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'service',
    component: ServiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mybooking',
    component: BookingComponent,
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
