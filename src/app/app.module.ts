import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { NetworkComponent } from './components/network/network.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileSettingComponent } from './components/profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import * as $ from 'jquery';
import { ConfirmEqualValidatorDirective } from './directive/confirm-equal-validator.directive';
import { HomeNavbarComponent } from './common/home-navbar/home-navbar.component';
import { LoginRegisterNavbarComponent } from './common/login-register-navbar/login-register-navbar.component';
import { UserBasicInfoComponent } from './common/user-basic-info/user-basic-info.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    NetworkComponent,
    FriendsListComponent,
    SettingsComponent,
    ProfileSettingComponent,
    ChangePasswordComponent,
    UserListComponent,
    ConfirmEqualValidatorDirective,
    HomeNavbarComponent,
    LoginRegisterNavbarComponent,
    UserBasicInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
