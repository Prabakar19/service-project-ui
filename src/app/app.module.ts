import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterationComponent } from './routes/auth/register/register.component';
import { RegistrationSpComponent } from './routes/auth/spregister/spregister.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './routes/auth/login/login.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { CustomerDashboardComponent } from './routes/customer-dashboard/customer-dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CardComponent } from './components/card/card.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SelectComponent } from './components/select/select.component';
import { AuthGuard } from './Guards/auth.guard';
import { ListServicesComponent } from './routes/list-services/list-services.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { ServiceComponent } from './routes/list-services/service-view/service.component';
import { CartPageComponent } from './routes/cart/cart.component';
import { BillCardComponent } from './routes/cart/bill-card/bill-card.component';
import { MyBookingPageComponent } from './routes/my-booking-page/my-booking-page.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ManageCustomersComponent } from './routes/manage-customers/manage-customers.component';
import { SpReportComponent } from './routes/sp-report/sp-report.component';
import { ServiceProviderDashboardComponent } from './routes/service-provider-dashboard/service-provider-dashboard.component';
import { AddServiceComponent } from './routes/add-service/add-service.component';
import { ModifyServiceComponent } from './routes/modify-service/modify-service.component';
import { DeleteServiceComponent } from './routes/delete-service/delete-service.component';
import { SpServiceCardComponent } from './components/sp-service-card/sp-service-card.component';
import { CustomerProfileComponent } from './routes/customer-profile/customer-profile.component';
import { EditCustomerComponent } from './routes/customer-profile/edit-customer/edit-customer.component';
import { AccountCircleComponent } from './components/account-circle/account-circle.component';
import { EmptyCardComponent } from './components/empty-card/empty-card.component';
import { FooterComponent } from './components/nav-bar/footer/footer.component';
import { SocialMediaLoginComponent } from './routes/social-media-login/social-media-login.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { SPLoginComponent } from './routes/auth/splogin/splogin-component';
import { AuthguardspGuard } from './Guards/authguardsp.guard';
import { SpProfileComponent } from './routes/sp-profile/sp-profile.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducer } from './state/state';
import { EffectsModule } from '@ngrx/effects';
import { CustomerDashboardEffects } from './routes/customer-dashboard/state/customer-dashboard.effects';
import { AuthEffects } from './routes/auth/state/auth.effects';
import { DialogComponent } from './components/dialog/dialog.component';
import { ListServiceEffects } from './routes/list-services/state/list-services.effects';
import { CartEffects } from './routes/cart/state/cart.effects';

@NgModule({
  declarations: [
    AppComponent,
    RegisterationComponent,
    RegistrationSpComponent,
    LoginComponent,
    SPLoginComponent,
    HomePageComponent,
    CustomerDashboardComponent,
    NavBarComponent,
    CardComponent,
    ImageCardComponent,
    SearchBarComponent,
    SelectComponent,
    ListServicesComponent,
    ServiceCardComponent,
    RatingComponent,
    LoaderComponent,
    ServiceComponent,
    CartPageComponent,
    BillCardComponent,
    MyBookingPageComponent,
    ToggleButtonComponent,
    RegistrationSpComponent,
    ManageCustomersComponent,
    SpReportComponent,
    ServiceProviderDashboardComponent,
    AddServiceComponent,
    ModifyServiceComponent,
    DeleteServiceComponent,
    SpServiceCardComponent,
    CustomerProfileComponent,
    EditCustomerComponent,
    AccountCircleComponent,
    EmptyCardComponent,
    FooterComponent,
    SocialMediaLoginComponent,
    DashboardCardComponent,
    SpProfileComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NgxPaginationModule,
    Ng2OrderModule,
    TooltipModule.forRoot(),
    EffectsModule.forRoot([CustomerDashboardEffects, AuthEffects, ListServiceEffects, CartEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [AuthGuard, AuthguardspGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
