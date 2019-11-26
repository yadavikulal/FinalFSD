import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  router: any;
  url:any;
  cid:any;
  message:accountInfo;
  constructor(private interactionService:InteractionService) {

   }

  ngOnInit() {

    //localStorage.setItem('token', 'CtfssY');
    this.cid=localStorage.getItem('token');
    this.url=`http://b8java18.iiht.tech:3000/findcustomer/`+this.cid;
    fetch(this.url)
    .then(res=>res.text())
    .then(data=>{
      console.log(data)
     
    })
  }
 


  profile(){
    console.log("Hello");
    this.router.navigateByUrl('/profile');
  }

}


//creating the interface that we have to send
interface accountInfo{
  customeraddress:any,
  customercontact:any,
  customeremail: any,
  customergender: any,
  customerid: any,
  customername: any,
  customerpassword: any,
  customerwallet: any,
  id: any,
  }
