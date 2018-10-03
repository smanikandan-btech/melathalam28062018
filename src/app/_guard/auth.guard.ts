import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any, 
    private router: Router, 
    private userService: UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const url: string = state.url;
    return this.checkLogin(url);
    /*if(localStorage.getItem('currentUser')){
      return true;
    }

    this.router.navigate(['/signin']);
    return false;*/
  }

  checkLogin(url: string): boolean{
    if(this.userService.isLoggedIn()){
      return true;
    }

    this.router.navigate(['/signin'], {queryParams: {r: url}});
    return false;
  }
}