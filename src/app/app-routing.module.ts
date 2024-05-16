import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NetworkComponent } from './components/network/network.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'network', component: NetworkComponent },
  { path: 'friends-list', component: FriendsListComponent },
  { path: 'setting', component: SettingsComponent },
  { path: 'user-list', component: UserListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
