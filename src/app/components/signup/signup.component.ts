import { Component, OnInit, ViewChild } from '@angular/core';
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
  private userLabel:string = 'Your';
  private utilityResponse: any = null;
  private currentStep: string = '';
  private profileForList;
  private profileFor: number;

  private days:number[] = [];
  private months:string[] = [];
  private years:number[] = [];

  private genders:string[] = [];
  private genderDisplayFlag:boolean = true;


  private Object = Object;
  private signupFormData = new SignupFormData();
  /*************** ****************/
  step1:Step1 = {
    profileFor: 0,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    gender: 0,
    dob: ''
  };
  @ViewChild('signupStep1Form') form: any;


  private eductionList: any[] = [];
  private incomeRangeList: any[] = [];
  private religionList: any[] = [];
  private motherToungeList : string[] = [];
  step2:Step2 = {
    //Religion Details
    religion: 0,
    caste: 0,
    subCaste: 0,
    //gothram: 0,
    dosham: 0,

    //Personal Details
    maritalStatus: 0,
    childrens:0,
    height: '',
    disability: 0,
    motherTongue: 0,
    desc: '',

    //Family Details
    familyStatus: 0,
    familyType: 0,
    familyValue: 0,
    numberOfBrothers:0,
    numberOfBrothersMarried: 0,
    numberOfSisters:0,
    numberOfSistersMarried: 0,

    //Professional Details
    eduction: 0,
    employedIn: 0,
    occupation: '',
    currentLocation: '',
    income: 0
  }
  @ViewChild('signupStep2Form') form1: any;
  /*************** ****************/
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentStep = typeof this.activatedRoute.snapshot.url[1] !== 'undefined' ? this.activatedRoute.snapshot.url[1].path : 'step1';

    //get the profiles list
    this.userService.getSignupUtilities().subscribe((data: any) => {
      this.utilityResponse = data;
      this.profileForList = data.profileFor;
    });

    //get the profiles list
    /*this.userService.getProfileFor().subscribe((data: any) => {
      this.profileForList = data;
    });*/

    for(var i = 1; i <= 31; i++){
      this.days.push(i);
    }
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var currentYear = (new Date()).getFullYear();
    for(var i = (currentYear - 18); i >= 1970; i--){
      this.years.push(i);
    }

    //STEP1: default values
    this.step1.profileFor = 0;
    this.step1.gender = 1;

    //STEP2: default values
    this.step2.dosham = 1;
    this.step2.dosham = 1;
    this.step2.maritalStatus = 1;
    this.step2.childrens = 0;
    this.step2.disability = 0;
    this.step2.familyStatus = 1;
    this.step2.familyType = 1;
    this.step2.motherTongue = 0;

    this.step2.numberOfBrothers = 0;
    this.step2.numberOfBrothersMarried = 0;
    this.step2.numberOfSisters = 0;
    this.step2.numberOfSistersMarried = 0;
  }

  onSubmit({value, valid}: {value: Step1, valid: boolean}){
    if(!valid){
      console.log('Signup form is not valid.');
    } else {
      this.currentStep = 'step2';

      this.signupFormData.profileFor = value.profileFor;
      this.signupFormData.name = value.name;
      this.signupFormData.dob = value.dob;
      this.signupFormData.gender = value.gender;
      this.signupFormData.mobile = value.mobile;
      this.signupFormData.email = value.email;
      this.signupFormData.password = value.password;
      this.signupFormData.confirmPassword = value.confirmPassword;
      
      this.eductionList = this.utilityResponse.education;
      this.incomeRangeList = this.utilityResponse.income;
      this.motherToungeList = this.utilityResponse.language;
      this.religionList = this.utilityResponse.religion;
      this.casteDisplayFlag = false;
      this.casteList = [];
      this.subCasteDisplayFlag = false;
      this.subCasteList = [];

      /*this.userService.getReligions().subscribe((data: any) => {
        if(data !== false){
          this.religionList = data;
        }
        this.casteDisplayFlag = false;
        this.casteList = [];
        this.subCasteDisplayFlag = false;
        this.subCasteList = [];
      });

      this.userService.getLanguages().subscribe((data: any) => {
        if(data !== false){
          this.motherToungeList = data;
        } else {
          this.motherToungeList = [];
        }
      });*/

      console.log('Step1 completed.');
    }
  }

  selectProfile(value){
    if(value && value != 1 && value != 6 && value != 7){
      this.genderDisplayFlag = false;
    } else {
      this.genderDisplayFlag = true;
    }

    if(value != 1){
      this.userLabel = this.profileForList[value]+' ';
    } else {
      this.userLabel = 'Your ';
    }
  }

  /**** STEP 2 ****/
  private casteDisplayFlag:boolean = false;
  private casteList: string[] = [];
  loadCasteByReligion(value){
    this.userService.getCaste(value).subscribe((data: any) => {
      if(data !== false && Object.keys(data).length){
        this.casteDisplayFlag = true;
        this.casteList = data;
      } else {
        this.casteList = [];
        this.casteDisplayFlag = false;
      }
      this.subCasteDisplayFlag = false;
      this.subCasteList = [];

      this.step2.caste = 0;
      this.step2.subCaste = 0;
    });
  }

  private subCasteDisplayFlag:boolean = false;
  private subCasteList: string[] = [];
  loadSubCasteByCaste(value){
    this.userService.getSubCaste(value).subscribe((data: any) => {
      if(data !== false && Object.keys(data).length){
        this.subCasteDisplayFlag = true;
        this.subCasteList = data;
      } else {
        this.subCasteList = [];
        this.subCasteDisplayFlag = false;
      }
      this.step2.subCaste = 0;
    });
  }

  private childrensDisplayFlag:boolean = false;
  onChangeMaritalStatus(value):void{
    if(value !== 1){
      this.step2.childrens = 0;
      this.childrensDisplayFlag = true;
    } else {
      this.childrensDisplayFlag = false;
    }
  }

  onComplete({value, valid}: {value: Step2, valid: boolean}){
    if(!valid){
      console.log('Signup step2 form is not valid.');
    } else {
      this.signupFormData.religion = value.religion;
      this.signupFormData.caste = value.caste;
      this.signupFormData.subCaste = value.subCaste;
      this.signupFormData.dosham = value.dosham;
      this.signupFormData.maritalStatus = value.maritalStatus;
      this.signupFormData.childrens = value.childrens;
      this.signupFormData.height = value.height;
      this.signupFormData.disability = value.disability;
      this.signupFormData.motherTongue = value.motherTongue;
      this.signupFormData.desc = value.desc;
      this.signupFormData.familyStatus = value.familyStatus;
      this.signupFormData.familyType = value.familyType;
      this.signupFormData.familyValue = value.familyValue;
      this.signupFormData.numberOfBrothers = value.numberOfBrothers;
      this.signupFormData.numberOfBrothersMarried = value.numberOfBrothersMarried;
      this.signupFormData.numberOfSisters = value.numberOfSisters;
      this.signupFormData.numberOfSistersMarried = value.numberOfSistersMarried;
      this.signupFormData.eduction = value.eduction;
      this.signupFormData.employedIn = value.employedIn;
      this.signupFormData.occupation = value.occupation;
      this.signupFormData.income = value.income;
      console.log('Signup step2 form submitted.');
    }
  }

  private noBMDisplayFlag:boolean = false;
  onChangeNOB(value):void{
    if(value > 0){
      this.noBMDisplayFlag = true;
    } else {
      this.noBMDisplayFlag = false;
    }
  }

  private noSMDisplayFlag:boolean = false;
  onChangeNOS(value):void{
    if(value > 0){
      this.noSMDisplayFlag = true;
    } else {
      this.noSMDisplayFlag = false;
    }
  }

  onSelectEducation(value):void{
    
  }

  goBack(){
    this.currentStep = 'step1';
  }
}
