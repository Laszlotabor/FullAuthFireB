import { Routes } from '@angular/router';
import { AuthtestComponent } from './authtest/authtest.component';
import { LoginComponent } from './components/login/login.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ManulComponent } from './components/manul/manul.component';


export const routes: Routes = [
  //   { path: 'test', component: AuthtestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogOutComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Home is protected
  { path: 'manul', component: ManulComponent, canActivate: [AuthGuard] }, // Home is protected

  { path: 'signin', component: SigninComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
];
