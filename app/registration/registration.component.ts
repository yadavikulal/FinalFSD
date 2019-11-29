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
  gender: String

  key: '123456$#@$^@1ERF';
  _url: any;
  error: any;
  _otp: any;
  resOtp: any;
  resTimeStamp: number;
  timeOutSession: number;

  constructor(private router: Router, private formbuilder: FormBuilder) {
    this.signupform = formbuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
      phonenumber: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.openModal.nativeElement.click();
  }
  //before registering we are using the api to send the otp for email verification
  postData(signupform: any) {
    alert("Successfully registered!")

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
  }
      





    //verifying the otp and timestamp and then registering the user if otp and timestamp is valid
//     verifyOtp(_otp)
//     {
//       this.timeOutSession=5; //our timeout session is 5 min 
//       let timestamp = this.generateTime();

//       let session=((timestamp-this.resTimeStamp)/60000);
//       console.log(this.phonenumber);
//       if(this.timeOutSession>session )
//       {
//         if(_otp==this.resOtp)
//         {
//           console.log("true");
//         this._url = `http://172.18.2.253:3000/register`;

//         fetch(this._url,{
//           method : "POST",
//           headers: {
//               "content-type": "application/json",
//               'Accept': 'application/json'
//              },
//              body : JSON.stringify({
//               customername:this.fname+" "+this.lname,
//               customeremail:this.email,
//               customerpassword:this.password,
//               customercontact: this.phonenumber,
//               customergender:this.gender,
//               customeraddress:this.address,
//               customerwallet:1000
//           })
//         })
//         .then(res=>res.json()) //getting the response the user registration
//           .then(data=>{
//             console.log(data[0]);
//           if(data[0]==="userexist"){
//           this.error="user already exists"
//           this.router.navigate(['register']);
//           } 
//           else{
//           localStorage.setItem('token', data[0]); //setting the userId in encrypted form 
//           fetch(`http://172.18.2.253:3000/otpverified`, //by this we're deleting the otp row from our email service database for that particular user
//           {
//             method : "POST",
//             headers: {
//                 "content-type": "application/json",
//                 'Accept': 'application/json'
//                },
//             body : JSON.stringify({
//                 fname:this.fname,
//                 lname:this.lname,
//                 to:this.email,
//                 subject:"Verify Email Address"
//             })
//         })
//         .then(res=>res.json())
//         .then(data=>{
//         console.log(data);
//         })
//         alert("successfully registered !")
//          this.router.navigate(['']);
//       }//once the otp row from the database has been deleted we are navigating it back to home page 

//         })

//   }//otp matched if block ends here
//   else{
//     this.error="OTP didn't match."
//     this.router.navigate(['register']);//will show the error on our html template 
//   }
// }//session time out if block ends here 
//   else{
//     this.error="Session time out."
//     this.router.navigate(['register']);//will show the error on our html template 
//   }  
//   }


  //password and confirm password matching 
  // MustMatch(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //       const control = formGroup.controls[controlName];
  //       const matchingControl = formGroup.controls[matchingControlName];

  //       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
  //           // return if another validator has already found an error on the matchingControl
  //           return;
  //       }

  //       // set error on matchingControl if validation fails
  //       if (control.value !== matchingControl.value) {
  //           matchingControl.setErrors({ mustMatch: true });
  //       } else {
  //           matchingControl.setErrors(null);
  //       }
  //   }
  //     }