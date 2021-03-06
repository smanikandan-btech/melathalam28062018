import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponseBody } from '../models/response-body';
import { GlobalService } from '../services/global.service';

import { map, catchError } from "rxjs/operators";

//import * as udata from './assets/users.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInSource = new BehaviorSubject<boolean>(false);
  loggedIn = this.loggedInSource.asObservable();

  private defaultResponse = new BehaviorSubject<ResponseBody>({status: 0, success: false, data: null});
  apiResponse = this.defaultResponse.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private globalService: GlobalService) { }

  login(email, password){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=UTF-8'
    });

    return this.http.post<ResponseBody>(
      this.globalService.apiHost + '/users/users/login',
      JSON.stringify({
        email: email,
        password: password
      }),
      {
        headers: headers
      }
    ).pipe(
      map((response: any) => {
        if(response.success && typeof response.data.access_token !== 'undefined'){
          this.localStorage.setItem(environment.tokenName, response.data.access_token);
          this.loggedInSource.next(true);
          return response;
        } else {
          this.localStorage.removeItem(environment.tokenName);
          this.loggedInSource.next(false);
          return {success: false, data: response.data.message};
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(){
    this.localStorage.removeItem(environment.tokenName);
    this.loggedInSource.next(false);
  }

  getToken() {
    return this.localStorage.getItem(environment.tokenName) || null;
  }
  isLoggedIn(){
    var token = this.getToken();
    if(token && this.jwtHelperService.isTokenExpired(token) !== true){
      this.loggedInSource.next(true);
      return true;
    } else {
      this.loggedInSource.next(false);
      return false;
    }
  }

  getJson(){
    //return this.http.get('assets/users.json');
    const usersjson = [
      {
        "id": 1,
        "email": "mani@gmail.com",
        "password": "123456"
      },
      {
        "id": 2,
        "email": "admin@gmail.com",
        "password": "654321"
      }
    ];
    return usersjson;
  }

  private handleError(response: any){
    let errorMessage:any = {};
    if(response.error.status == 0){
      errorMessage = {
        status: 0,
        success: false,
        data: 'Sorry, there was a connection error occurred, Please try again.'
      };
    } else {
      errorMessage = {success: false, data: 'Opps!! Somthing went wrong. Please try again after sometime.'};//response.error;
    }
    return throwError(errorMessage);
  }


  private getHeaders():HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer '+this.getToken()
    });
  }

  getProfileFor(){
    return this.http.get<ResponseBody>(
      this.globalService.apiHost + '/helper/get-profilefor-list'
    ).pipe(
      map((response: any) => {
        if(response.success){
          return response.data;
        } else {
          return response.data;
        }
      }),
      catchError(this.handleError)
    );
  }

  getReligions():any{
    return this.http.get<ResponseBody>(
      this.globalService.apiHost + '/helper/get-religion-list'
    ).pipe(
      map((response: any) => {
        if(response.success){
          return response.data;
        } else {
          return false;
        }
      }),
      catchError(this.handleError)
    );
  }

  getCaste(rid):any{
    const url = this.globalService.apiHost + '/helper/get-caste-list?id='+rid;
    return this.http.get<ResponseBody>(url).pipe(
      map((response: any) => {
        if(response.success){
          return response.data;
        } else {
          return false;
        }
      }),
      catchError(this.handleError)
    );
  }

  getSubCaste(cid):any{
    const url = this.globalService.apiHost + '/helper/get-sub-caste-list?id='+cid;
    return this.http.get<ResponseBody>(url).pipe(
      map((response: any) => {
        if(response.success){
          return response.data;
        } else {
          return false;
        }
      }),
      catchError(this.handleError)
    );
  }

  getLanguages():any{
    const url = this.globalService.apiHost + '/helper/get-languages-list';
    return this.http.get<ResponseBody>(url).pipe(
      map((response: any) => {
        if(response.success){
          return response.data;
        } else {
          return false;
        }
      }),
      catchError(this.handleError)
    );
  }

  getSignupUtilities(){
    return this.http.get<ResponseBody>(
      this.globalService.apiHost + '/helper/signup-utility'
    ).pipe(
      map((response: any) => {
        if(response.success){
          return response.data;
        } else {
          return response.data;
        }
      }),
      catchError(this.handleError)
    );
  }

  completeRegistration(params){
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=UTF-8'
    });

    return this.http.post<ResponseBody>(
      this.globalService.apiHost + '/users/users/signup',
      JSON.stringify(params),
      {
        headers: headers
      }
    ).pipe(
      map((response: any) => {
        if(response.success){
          if(typeof response.data.result !== undefined && response.data.result == 'success'){
            return {success: true, text: response.data.message};
          } else {
            return {success: false, text: response.data.errors};
          }
        } else {
          return {success: false, text: 'Your registration failed.'};
        }
      }),
      catchError(this.handleError)
    );
  }

  confirmEmail(argCode){
    return this.http.post<ResponseBody>(
      this.globalService.apiHost + '/users/users/confirm',
      {
        id: argCode
      },
      {
        headers: this.getHeaders()
      }
    ).pipe(
      map((response: any) => {
        if(response.success && response.data.result == 'success'){
          return {success: true, text: response.data.msg};
        } else {
          return {success: false, text: response.data.msg};
        }
      }), 
      catchError(this.handleError)
    );
  }

  forgotPassword(argEmail){
    return this.http.post<ResponseBody>(
      this.globalService.apiHost + '/users/users/forgot-password',
      {
        email: argEmail
      },
      {
        headers: this.getHeaders()
      }
    ).pipe(
      map((response: any) => {
        if(response.success && response.data.result == 'success'){
          return {success: true, text: response.data.msg};
        } else {
          return {success: false, text: response.data.msg};
        }
      }), 
      catchError(this.handleError)
    );
  }

  setPassword(pass, cpass, auth_id){
    return this.http.post<ResponseBody>(
      this.globalService.apiHost + '/users/users/set-password',
      {
        password: pass,
        confirm_password: cpass,
        id: auth_id
      },
      {
        headers: this.getHeaders()
      }
    ).pipe(
      map((response: any) => {
        if(response.success && response.data.result == 'success'){
          return {success: true, text: response.data.msg};
        } else {
          return {success: false, text: response.data.msg};
        }
      }), 
      catchError(this.handleError)
    );
  }
}