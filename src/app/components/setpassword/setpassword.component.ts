import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SetPassword } from '../../models/Users';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
  private showSpinnerFlag: boolean = false;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if(typeof this.activatedRoute.snapshot.queryParams.id === 'undefined'
    || this.activatedRoute.snapshot.queryParams.id == ''){
      this.alertService.success('Wrong set password page url.', true);
      this.router.navigate(['/signin']);
    }
  }

  onSubmit({value, valid}: {value: SetPassword, valid: boolean} ){
    if(!valid){
      console.log('Setpassword form validation failed.');
    } else {
      this.showSpinnerFlag = true;
      this.userService.setPassword(value.password, value.cpassword, this.activatedRoute.snapshot.queryParams.id).subscribe((res:any) => {
        if(res.success){
          this.alertService.success(res.text, true);
          this.router.navigate(['/signin']);
        } else {
          this.showSpinnerFlag = false;
          this.alertService.error(res.text, true);
        }  
      });
    }
  }
}
