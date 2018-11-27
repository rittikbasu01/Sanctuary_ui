import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './design.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import{ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import { ProfileComponent } from './profile/profile.component';
import {AgGridModule} from 'ag-grid-angular/main';

import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AppRoutingModule } from './routingModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComponent } from './booking/booking.component';
import { CookieService } from 'ngx-cookie-service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { UserService } from './shared/user.service';

import { BookingService } from './shared/booking.service';
import { ResultService } from './shared/result.service';

import {AuthenticationGuard} from './authentication.guard';
import { AdminGuard } from './admin.guard';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { PreviousBookingsComponent } from './previous-bookings/previous-bookings.component';

import { AdminLocationSettingComponent } from './admin-location-setting/admin-location-setting.component';
import { AdminLocationServiceService } from './shared/admin-location-service.service';

import { AdminComponent } from './admin/admin.component';
import { AdminAssetSettingComponent } from './admin-asset-setting/admin-asset-setting.component';
import { AdminassetService } from './shared/adminasset.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { AdminRoleSettingsComponent } from './admin-role-settings/admin-role-settings.component';
import { AdminroleService } from './shared/adminrole.service';
import { ProfileGuard } from './profile.guard';
import { CabBookingComponent } from './cab-booking/cab-booking.component';
import { ReportsComponent } from './reports/reports.component';
import { ExceptionComponent } from './exception/exception.component';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { ShowAssetsComponent } from './show-assets/show-assets.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CarouselComponent,
    ConfirmEqualValidatorDirective,
    BookingComponent,
    ProfileComponent,
    ConfirmEqualValidatorDirective,
   
    ConfirmBookingComponent,
    PreviousBookingsComponent,
    
    AdminLocationSettingComponent,
    AdminComponent,
   
    AdminAssetSettingComponent,
    
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AdminRoleSettingsComponent,
    CabBookingComponent,
    ReportsComponent,
    ExceptionComponent,
    ShowAssetsComponent
    
  ],
  imports: [
    BrowserModule, 
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ShowHidePasswordModule.forRoot(),
  ],
  providers: [ UserService, CookieService,BookingService, CookieService, ResultService,AdminroleService,AdminGuard, ProfileGuard,
    UserService, CookieService, ResultService ,AuthenticationGuard, AdminLocationServiceService,AdminassetService, AdminroleService],


  bootstrap: [AppComponent]
})
export class AppModule { }
