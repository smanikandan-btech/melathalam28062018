import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SigninComponent } from './components/signin/signin.component';
import{ ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { SignupComponent } from './components/signup/signup.component';
//import { NavbarComponent } from './components/navbar/navbar.component';
//import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'signin', component: SigninComponent},
  {path: 'forgot-password', component: ForgotpassComponent},
  {path: 'register', component: SignupComponent},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
  {path: 'client/:id', component: ClientComponent},
  {path: 'client/add', component: ClientFormComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    //CommonModule
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
