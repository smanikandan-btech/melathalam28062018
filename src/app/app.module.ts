import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientComponent } from './components/client/client.component';
import { AppRoutingModule } from './/app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AlertComponent } from './components/alert/alert.component';

import { AuthGuard } from './_guard/auth.guard';
import { UserService } from './/services/user.service';
import { GlobalService } from './/services/global.service';
import { AuthenticationService } from './/services/authentication.service';
import { AlertService } from './/services/alert.service';
//import { FormDataService } from './/services/form-data.service';

import { NgtUniversalModule } from '@ng-toolkit/universal';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { SetpasswordComponent } from './components/setpassword/setpassword.component';
import { UsersComponent } from './components/users/users.component';

export function jwtOptionsFactory(localStorage) {
  return {
    tokenGetter: () => {
      return localStorage.getItem(environment.tokenName) || '';
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    ClientsComponent,
    ClientFormComponent,
    ClientComponent,
    NotFoundComponent,
    SettingsComponent,
    AlertComponent,
    ForgotpassComponent,
    SetpasswordComponent,
    UsersComponent
  ],
  imports:[
    CommonModule,
    NgtUniversalModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LOCAL_STORAGE]
      }
    }),
  ],
  providers: [
    AuthGuard,
    UserService,
    AuthenticationService,
    GlobalService,
    AlertService,
    //{provide: FormDataService, useClass: FormDataService}
  ],
})
export class AppModule { }
