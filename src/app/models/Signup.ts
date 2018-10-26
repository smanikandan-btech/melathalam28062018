export class SignupFormData{
  //Basic Details
  profileFor: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  gender: number;
  dob: string;

  //Religion Details
  religion: number;
  caste:number;
  subCaste: number;
  gothram: string;
  dosham: number;

  //Personal Details
  maritalStatus: number;
  childrens: number;
  height: string;
  disability: number;
  motherTongue: number;
  desc: string;
  color: string;
  eatingHabit: number;

  //Family Details
  familyStatus: number;
  familyType: number;
  familyValue: number;
  numberOfBrothers:number;
  numberOfBrothersMarried: number;
  numberOfSisters:number;
  numberOfSistersMarried: number;
  origin:string;
  familyLocation: string;
  
  //Professional Details
  eduction: number;
  employedIn: number;
  occupation: string;
  currentLocation: string;
  income: number; //annual
}


export class Step1{
  //Basic Details
  profileFor: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  gender: number;
  //dob: string;
  dobyear: number;
  dobmonth: number;
  dobdate: number;
}

export class Step2{
  //Religion Details
  religion: number;
  caste:number;
  subCaste: number;
  gothram: string;
  dosham: number;

  //Personal Details
  maritalStatus: number;
  childrens: number;
  height: string;
  color: string;
  disability: number;
  motherTongue: number;
  desc: string;
  eatingHabit: number;

  //Family Details
  familyStatus: number;
  familyType: number;
  familyValue: number;
  numberOfBrothers:number;
  numberOfBrothersMarried: number;
  numberOfSisters:number;
  numberOfSistersMarried: number;
  origin: string;
  familyLocation: string;
  
  //Professional Details
  eduction: number;
  employedIn: number;
  occupation: string;
  currentLocation: string;
  income: number; //annual
}