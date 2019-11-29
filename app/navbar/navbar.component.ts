import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 city:any
 username:string;
 userid:string;
 key:'123456$#@$^@1ERF';
 _url:any;
cid:any;
cart:any;
  constructor() { }

  ngOnInit() {
    this.city=localStorage.getItem("city");
    this.loggedInUser();
  }


  loggedInUser(){
    this.userid =localStorage.getItem('token');
    if(this.userid!=undefined){ 
    this._url = `http://b8java18.iiht.tech:3000/findcustomer/`+this.userid;
    fetch(this._url)
    .then(res=>res.json())
    .then(data=>{
      this.username=data[0].customername;      
    })
  }
  else{
   this.username='noLoggedInUser'
  }

  this.cid=localStorage.getItem('token');
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
}

logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  window.location.reload();
}

  
}
