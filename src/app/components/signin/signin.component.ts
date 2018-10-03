import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { Login } from '../../models/Login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  returnURL: string = '/';
  login: Login;
  public showSuccessMessage: string = '';
  public showErrorMessage: string = '';
  public showSpinnerFlag: boolean = false;
  @ViewChild('loginForm') form: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnURL = this.activatedRoute.snapshot.queryParams['r'] || '/';
  }

  onSubmit({value, valid}: {value: Login, valid: boolean}){
    if(!valid){
      this.showSpinnerFlag = false;
      console.log('Form is not valid');
    } else {
      this.showSpinnerFlag = true;
      this.userService.login(value.email, value.password).subscribe(response => {
        if(response.success){
          console.log('Login Successful.');
          this.showSuccessMessage = 'Login Successful.';
          this.router.navigate([this.returnURL]);
        } else {
          console.log('Login Failed...');
          this.showErrorMessage = response.data;
          this.showSpinnerFlag = false;
        }
      }, err => {
        this.showSpinnerFlag = false;
        this.showErrorMessage = err.data;
      });
    }
  }
}
