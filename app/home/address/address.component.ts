import { InteractionService } from './../../interaction.service';
import { Component, OnInit } from '@angular/core';

import {FormGroup,FormControl, FormBuilder , Validators, NgForm, ControlContainer} from '@angular/forms';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  signupform:FormGroup;
  address:string;
  cid:string;
  url:string;

  constructor(private interactionService:InteractionService, private formbuilder:FormBuilder) { }

  ngOnInit() {
    this.cid=localStorage.getItem('token');
    this.url=`http://localhost:3000/findcustomer?cid=`+this.cid;
    fetch(this.url)
    .then(res=>res.json())
    .then(data=>{
      console.log("mydata");
      (<HTMLOutputElement>document.getElementById('address')).value=data[0].customeraddress;
    })
    this.interactionService.accountInfo$
    .subscribe(
      message=>{
        console.log(message)
        this.address=message.customeraddress
        console.log(this.address);
      });
      this.signupform=this.formbuilder.group({
        address:[this.address,[Validators.required,Validators.minLength(6)]],
       })
  }

  postData(signupform:any){
    this.address=signupform.controls.address.value;
    
  }




}
