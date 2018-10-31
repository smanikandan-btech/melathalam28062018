import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ForgotPass } from '../../models/ForgotPass';
import { AlertService  } from '../../services/alert.service';

@Component({
  //selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  private showSpinnerFlag: boolean = false;
  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }
  ngOnInit() {
  }

  onSubmit({value, valid}: {value: ForgotPass, valid: boolean}){
    if(!valid){
      this.showSpinnerFlag = false;
      console.log('Forgot password form is not valid');
    } else {
      this.showSpinnerFlag = true;
      this.userService.forgotPassword(value.email).subscribe((res:any) => {
        if(res.success){
          this.alertService.success(res.text, true);
        } else {
          this.alertService.error(res.text, true);
        }
        this.showSpinnerFlag = false;
      });
    }
  }
}