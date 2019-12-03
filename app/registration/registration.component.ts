
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  @ViewChild('openModal', undefined) openModal: ElementRef;
  signupform: FormGroup;

  fname: String
  lname: String
  email: String
  password: String
  confirmPass: String
  phonenumber: String
  address: String;
  gender: String;

  _url: any;
  error: any;
 
  


  constructor(private router: Router, private formbuilder: FormBuilder) {
    this.signupform = formbuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: [''],
      email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.com$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
      phonenumber: ['',[ Validators.required,Validators.pattern('^[7-9][0-9]{9}$')]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
     
    },
      { validator: this.MustMatch('password', 'confirmPass') });
  }



  ngOnInit() {
    this.openModal.nativeElement.click();
  }
  postData(signupform: any) {
    alert("Successfully registered!")
    this.router.navigate(['']);
    
    this._url = `http://b8java18.iiht.tech:3000/register`

    this.fname = signupform.controls.fname.value;
    this.lname = signupform.controls.lname.value;
    this.email = signupform.controls.email.value;
    this.confirmPass = signupform.controls.confirmPass.value;
    this.password = signupform.controls.password.value;
    this.gender = signupform.controls.gender.value;
    this.address = signupform.controls.address.value;
    this.phonenumber = signupform.controls.phonenumber.value;

    fetch(this._url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        customername: this.fname + " " + this.lname,
        customeremail: this.email,
        customerpassword: this.password,
        customercontact: this.phonenumber,
        customergender: this.gender,
        customeraddress: this.address,
        customerwallet: 1000
      })
    })
  }
  
  //password and confirm password matching 
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}