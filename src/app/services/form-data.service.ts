import { Injectable } from '@angular/core';
import { SignupFormData, Step1, Step2 } from '../models/Signup';
@Injectable()
export class FormDataService{
  private formData:SignupFormData = new SignupFormData();
  constructor(
    private signup: SignupFormData
  ){

  }

  getStep1():Step1{
    var step1: Step1 = {
      profileFor: this.formData.profileFor,
      name: this.formData.name,
      dob: this.formData.dob,
      email: this.formData.email,
      password: this.formData.password,
      confirmPassword: this.formData.confirmPassword,
      gender: this.formData.gender,
      mobile: this.formData.mobile,
    };
    return step1;
  }

  setStep1(data: Step1){
    this.formData.profileFor = data.profileFor;
    this.formData.name = data.name;
    this.formData.dob = data.dob;
    this.formData.email = data.email;
    this.formData.password = data.password;
    this.formData.confirmPassword = data.confirmPassword;
    this.formData.gender = data.gender;
    this.formData.mobile = data.mobile;
  }
}