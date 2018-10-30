import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ForgotPass } from '../../models/ForgotPass';

@Component({
  //selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  private showSpinnerFlag: boolean = false;
  constructor(private userService: UserService) { }
  ngOnInit() {
  }

  onSubmit({value, valid}: {value: ForgotPass, valid: boolean}){
    if(!valid){
      this.showSpinnerFlag = false;
      console.log('Forgot password form is not valid');
    } else {
      this.showSpinnerFlag = true;

      this.userService.forgotPassword(value.email).subscribe(
        res => {
          
        },
        err => {

        }
      );

      console.log('Forgot password form is valid');
    }
  }
}