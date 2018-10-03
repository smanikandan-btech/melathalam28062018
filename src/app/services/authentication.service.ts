import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { UserService } from './user.service';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginVar: Login = {
    email: '',
    password: ''
  };

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private userService: UserService) { }

  login(email: string, password: string): void {
    //this.userService.login({email: email, password: password});
    /*this.userService.getJson().forEach((cur, index) => {
      if(cur.email === email && cur.password === password){
        this.localStorage.setItem('currentUser', JSON.stringify(cur));
      }
    });*/
  }
}
