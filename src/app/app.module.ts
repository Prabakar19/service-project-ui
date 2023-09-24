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
import { AuthGuard } from './guards/auth.guard';
import { ListServicesComponent } from './routes/list-services/list-services.component';
import { ServiceCardComponent } from './routes/list-services/service-card/service-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { ServiceComponent } from './routes/list-services/service-view/service.component';
import { CartPageComponent } from './routes/cart/cart.component';
import { BillCardComponent } from './routes/cart/bill-card/bill-card.component';
import { BookingComponent } from './routes/booking/booking.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { ManageCustomersComponent } from './routes/manage-customers/manage-customers.component';
import { SpReportComponent } from './routes/sp-report/sp-report.component';
import { SPDashboardComponent } from './routes/sp-dashboard/sp-dashboard.component';
import { AddServiceComponent } from './routes/sp-dashboard/add-service-card/add-service/add-service.component';
import { ModifyServiceComponent } from './routes/sp-dashboard/modify-service/modify-service.component';
import { DeleteServiceComponent } from './routes/sp-dashboard/delete-service/delete-service.component';
import { SpServiceCardComponent } from './routes/sp-dashboard/sp-service-card/sp-service-card.component';
import { CustomerProfileComponent } from './routes/customer-profile/customer-profile.component';
import { EditCustomerComponent } from './routes/customer-profile/edit-customer/edit-customer.component';
import { AccountCircleComponent } from './components/account-circle/account-circle.component';
import { EmptyCardComponent } from './components/empty-card/empty-card.component';
import { FooterComponent } from './components/nav-bar/footer/footer.component';
import { SocialMediaLoginComponent } from './routes/social-media-login/social-media-login.component';
import { AddServiceCardComponent } from './routes/sp-dashboard/add-service-card/add-service-card.component';
import { SPLoginComponent } from './routes/auth/splogin/splogin-component';
import { AuthguardspGuard } from './guards/authguardsp.guard';
import { SpProfileComponent } from './routes/sp-profile/sp-profile.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appEffects, appReducer } from './state/state';
import { EffectsModule } from '@ngrx/effects';
import { DialogComponent } from './components/dialog/dialog.component';

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
    BookingComponent,
    ToggleButtonComponent,
    RegistrationSpComponent,
    ManageCustomersComponent,
    SpReportComponent,
    SPDashboardComponent,
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
    AddServiceCardComponent,
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
    EffectsModule.forRoot(appEffects),
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
