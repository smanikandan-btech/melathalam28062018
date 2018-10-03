import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupFormData, Step1, Step2 } from '../../models/Signup';
import { UserService } from '../../services/user.service';
import { ResponseBody } from '../../models/response-body';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private currentStep: string = '';
  private profileForList;
  private profileForListKeys;
  private profileFor: number;

  private days:number[] = [];
  private months:string[] = [];
  private years:number[] = [];

  private genders:string[] = [];
  private genderDisplayFlag:boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentStep = typeof this.activatedRoute.snapshot.url[1] !== 'undefined' ? this.activatedRoute.snapshot.url[1].path : 'step1';

    //get the profiles list
    this.userService.getProfileFor().subscribe((data: any) => {
      this.profileForList = data;
      this.profileForListKeys = Object.keys(this.profileForList);
    });

    for(var i = 1; i <= 31; i++){
      this.days.push(i);
    }
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var currentYear = (new Date()).getFullYear();
    for(var i = (currentYear - 18); i >= 1970; i--){
      this.years.push(i);
    }

    //profile for
    this.profileFor = 0;
  }

  onSubmit({value, valid}: {value: SignupFormData, valid: boolean}){
    if(!valid){
      console.log('Signup form is not valid.');
    } else {
      
    }
  }

  selectProfile(value){
    if(value && value != 1 && value != 6 && value != 7){
      this.genderDisplayFlag = false;
    } else {
      this.genderDisplayFlag = true;
    }
  }

}
