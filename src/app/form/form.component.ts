import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY'
  },
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class FormComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  
  disableSelectAngular = new FormControl(true)
  disableSelectReact = new FormControl(true)
  disableSelectVue = new FormControl(true)

  allData = {}

  finame = ''
  sename = ''
  dayobirth = 1
  selectframework = ''
  SelectframeworkVersionA = ''
  SelectframeworkVersionR = ''
  SelectframeworkVersionV = ''
  emai = ''
  inputhobbby = ''
  

  ngOnInit(): void {

  }

  Selectframework(event: MatSelectChange) {
    this.selectframework = event.value;
    if (this.selectframework === "Angular")
    {
      this.disableSelectAngular = new FormControl(false)
      this.disableSelectReact = new FormControl(true)
      this.disableSelectVue = new FormControl(true)
    }
    else if(this.selectframework === "React")
    {
      this.disableSelectAngular = new FormControl(true)
      this.disableSelectReact = new FormControl(false)
      this.disableSelectVue = new FormControl(true)
    }
    else if(this.selectframework === "Vue")
    {
      this.disableSelectAngular = new FormControl(true)
      this.disableSelectReact = new FormControl(true)
      this.disableSelectVue = new FormControl(false)
    }
  }

  SelectframeworkVersionAngular(event: MatSelectChange){
    this.SelectframeworkVersionA = event.value;
  }
  SelectframeworkVersionReact(event: MatSelectChange){
    this.SelectframeworkVersionR = event.value;
  }
  SelectframeworkVersionVue(event: MatSelectChange){
    this.SelectframeworkVersionV = event.value;
  }

  inputnamef(value: string){
    let fname = ''
    fname = value
    this.finame = fname
  }

  inputnames(value: string) {
    let sname = ''
    sname = value
    this.sename = sname
  }

  inputd(value: any) {
    let dobirth = 1
    dobirth = value
    this.dayobirth = dobirth
  }

  inputemail(value: string){
    let emailf = ''
    emailf = value
    this.emai = emailf
    if (this.emai === 'test@test.test'){
      setTimeout(() => {
        this.dialog.open(emailDub)
      }, 2000);
    }
  }

  inputhobby(value: string){
    let inputh = ''
    inputh = value
    this.inputhobbby = inputh
  }

  emailFormControl = new FormControl('',
  [
    Validators.required,
    Validators.email,
  ]);
  firstNameFormControl = new FormControl('',
  [
    Validators.required,
  ]);
  secondNameFormControl = new FormControl('',
  [
    Validators.required,
  ]);
  inputhobbyFormControl = new FormControl('',
  [
    Validators.required,
  ]);

  sendAllData() {
    
    if (this.inputhobbby === ''){
      this.dialog.open(hobbyBlank)
    }
    if (this.emai === ''){
      this.dialog.open(emailBlank)
    }
    if (this.SelectframeworkVersionV === '', this.SelectframeworkVersionR === '', this.SelectframeworkVersionA === ''){
      this.dialog.open(versionBlank)
    }
    if (this.selectframework === ''){
      this.dialog.open(framworkBlank)
    }
    if (this.dayobirth === 1){
      this.dialog.open(dayOfBirthBlank)
    }
    if (this.sename === ''){
      this.dialog.open(secondNameBlank)
    }
    if (this.finame === ''){
      this.dialog.open(firstNameBlank)
    }

    else if (this.selectframework === "Angular"){
      this.allData = {
        firstName: this.finame,
        secondName: this.sename,
        dateOfBirth: this.dayobirth,
        framework: this.selectframework,
        frameworkVersion: this.SelectframeworkVersionA,
        email: this.emai,
        hobby: this.inputhobbby
      }
    }
    else if (this.selectframework === "React"){
      this.allData = {
        firstName: this.finame,
        secondName: this.sename,
        dateOfBirth: this.dayobirth,
        framework: this.selectframework,
        frameworkVersion: this.SelectframeworkVersionR,
        email: this.emai,
        hobby: this.inputhobbby
      }
    }
    else if (this.selectframework === "Vue"){
      this.allData = {
        firstName: this.finame,
        secondName: this.sename,
        dateOfBirth: this.dayobirth,
        framework: this.selectframework,
        frameworkVersion: this.SelectframeworkVersionV,
        email: this.emai,
        hobby: this.inputhobbby
      }
    }  
    console.log(this.allData)
  } 
}

@Component({
  selector: 'emailDub',
  template: `<h1 mat-dialog-title>Такой email уже существует</h1>`,
})
export class emailDub {}
@Component({
  selector: 'firstNameBlank',
  template: `<h1 mat-dialog-title>Не ввели имя</h1>`,
})
export class firstNameBlank {}
@Component({
  selector: 'secondNameBlank',
  template: `<h1 mat-dialog-title>Не ввели фамилию</h1>`,
})
export class secondNameBlank {}
@Component({
  selector: 'dayOfBirthblank',
  template: `<h1 mat-dialog-title>Не ввели дату рождения</h1>`,
})
export class dayOfBirthBlank {}
@Component({
  selector: 'framworkBlank',
  template: `<h1 mat-dialog-title>Не выбрали фреймворк</h1>`,
})
export class framworkBlank {}
@Component({
  selector: 'versionBlank',
  template: `<h1 mat-dialog-title>Не выбрали версию фреймворка</h1>`,
})
export class versionBlank {}
@Component({
  selector: 'emailBlank',
  template: `<h1 mat-dialog-title>Не ввели email</h1>`,
})
export class emailBlank {}
@Component({
  selector: 'hobbyBlank',
  template: `<h1 mat-dialog-title>Не ввели увлечение</h1>`,
})
export class hobbyBlank {}
