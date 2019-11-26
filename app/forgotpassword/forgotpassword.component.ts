import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
  email:any;
  name:any;
  data:any;
  mytime:number;
  constructor() {

   }

  ngOnInit() {

  }
  
  sendotp(){
    this.email=(<HTMLOutputElement>document.getElementById("email")).value;
    console.log(this.email);
    let url="http://b8java18.iiht.tech:3000/findbyemail?email="+this.email;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
       this.name=data[0].customername;
       let url="http://b8java18.iiht.tech:3000/resetpassword"
       fetch(url,{
        method : "POST",
        headers: {
            "content-type": "application/json",
            'Accept': 'application/json'
           },
        body : JSON.stringify({
            name:this.name,
            to:this.email,
            subject:"Password Reset OTP"
        })
       })
    .then(res=>res.json())
    .then(data=>{
      console.log(data); 
      this.data=data;   
    })
      })
  }

  generateTime():number{
    let date = new Date();
    let timestamp = date.getTime();
    return timestamp;
  }

  verify(){
    let inotp=(<HTMLOutputElement>document.getElementById('otp')).value;
    let myotp=this.data.otp;
    let time=+this.data.timeStamp;
    console.log(inotp+" "+myotp+" "+time);
    this.mytime=this.generateTime();
    console.log(this.mytime-time)
    if(inotp==myotp && (this.mytime-time)<=120000 ){
      this.openModal.nativeElement.click();
    }
    else{
      alert ("otp time expired! request for another")
    }

  }

  reset(){
    let mypwd=(<HTMLOutputElement>document.getElementById('mypwd')).value;
    let cnfpwd=(<HTMLOutputElement>document.getElementById('cnfpwd')).value;
    console.log(mypwd+" "+cnfpwd);
    if(mypwd==cnfpwd){
      let url="http://b8java18.iiht.tech:3000/changepassword?email="+this.email+"&pass="+mypwd;
      console.log(url)
      fetch(url)
    .then(res=>res.json())
    .then(data=>{})
    alert("password changed successfully")!!
    }
    else{
      alert("Passwords doesn't match!!");
    }
  }

}
