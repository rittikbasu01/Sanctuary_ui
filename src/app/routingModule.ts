import{NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';

import { BookingComponent} from './booking/booking.component';

import { CarouselComponent } from './carousel/carousel.component';
import {AuthenticationGuard} from './authentication.guard';
import { AppComponent } from './app.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { PreviousBookingsComponent } from './previous-bookings/previous-bookings.component';
import { AdminLocationSettingComponent } from "./admin-location-setting/admin-location-setting.component";
import { AdminComponent } from './admin/admin.component';
import { AdminAssetSettingComponent } from './admin-asset-setting/admin-asset-setting.component';
import { AdminRoleSettingsComponent } from './admin-role-settings/admin-role-settings.component';
import { AdminGuard } from './admin.guard';
import { ProfileGuard } from './profile.guard';
import { CabBookingComponent } from './cab-booking/cab-booking.component';
import { ExceptionComponent } from './exception/exception.component';
import { ReportsComponent } from './reports/reports.component';
import { ShowAssetsComponent } from './show-assets/show-assets.component';

const routes:Routes=[
  
    
    {path:'',component:CarouselComponent},
    {path:'profile',component:ProfileComponent,canActivate:[ProfileGuard]},
    {path:'booking',component:BookingComponent, canActivate:[AuthenticationGuard]},
    {path: 'previous-bookings', component : PreviousBookingsComponent, canActivate: [AuthenticationGuard]},
    {path:'bookingdetail',component:ConfirmBookingComponent,canActivate:[AuthenticationGuard]},
    {path:'adminLocation',component:AdminLocationSettingComponent,canActivate:[AdminGuard]},
    {path:'admin',component:AdminComponent,canActivate:[AdminGuard]},
    {path:'adminAsset',component:AdminAssetSettingComponent,canActivate:[AdminGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'cabbooking',component:CabBookingComponent},
    {path:'adminRole',component:AdminRoleSettingsComponent,canActivate:[AdminGuard]},
    {path:'reports',component:ReportsComponent,canActivate:[AdminGuard]},
    {path:'showAssets',component:ShowAssetsComponent,canActivate:[AdminGuard]},
    {path: 'error', component: ExceptionComponent},
    {path:'**',redirectTo:"/", pathMatch:"full"}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{ }