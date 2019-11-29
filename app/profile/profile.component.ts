import { InteractionService } from './../interaction.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, FormBuilder, Validators, NgForm, ControlContainer} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  signupform:FormGroup;

  name:string;
  gender: string;
  number:string
  email:string;
  cid:string;
  url:string;
  

  city:any;
  username: string;
password: string;
userId:string;
error:string;
urlnew:string;
cart:string;

  constructor(private interactionService:InteractionService, private formbuilder:FormBuilder) {

   }

  ngOnInit() {

    this.city=localStorage.getItem("city");
    console.log("mycity"+this.city)
    this.city=localStorage.getItem('city');
    let url= "http://b8java18.iiht.tech:3000/showallproduct?city="+this.city;
    fetch(url,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    .then(res => res.json())
    .then(data=> 
      {
      console.log(data)
    })

    this.cid =localStorage.getItem('id');
    if(this.cid!=undefined){ 
    this.urlnew = 'http://b8java18.iiht.tech:3000/findcustomerid/'+this.cid;
    fetch(this.urlnew)
    .then(res=>res.json())
    .then(data=>{
      this.username=data[0].customername;   
      this.city=localStorage.getItem("city");   
    })
  }
  else{
   this.username='noLoggedInUser'
  }

  let url3="http://b8java18.iiht.tech:3000/viewcart/"+this.cid;
  fetch(url3,{
    method:"GET",
    headers:{
      "content-type":"application/json"
    }
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    if(data[0]!=null){
      this.cart='items';
    }
    else{
      this.cart='noitems';
    }
  })
    //********************* */

    this.cid=localStorage.getItem('id');
    this.url=`http://b8java18.iiht.tech:3000/findcustomerid/`+this.cid;
    fetch(this.url)
    .then(res=>res.json())
    .then(data=>{
      console.log("mydata");
      console.log(data);
      (<HTMLOutputElement>document.getElementById('name')).value=data[0].customername;
      (<HTMLOutputElement>document.getElementById('gender')).value=data[0].customergender;
      (<HTMLOutputElement>document.getElementById('contact')).value=data[0].customercontact;
      (<HTMLOutputElement>document.getElementById('mail')).value=data[0].customeremail;
    })
     
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.reload();
  }
}
