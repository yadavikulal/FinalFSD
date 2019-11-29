import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username:string;
  userid:string;
  key:'123456$#@$^@1ERF';
  _url:any;

  constructor() {
    
  }
   

  ngOnInit(){
    
    this.loggedInUser();
  }

  loggedInUser(){
    this.userid =localStorage.getItem('id');
    if(this.userid!=undefined){ 
    this._url = `http://b8java18.iiht.tech:3000/findcustomerid/`+this.userid;
    fetch(this._url)
    .then(res=>res.json())
    .then(data=>{
      this.username=data[0].customername;      
    })
  }
  else{
   this.username='noLoggedInUser'
  }
}

}
