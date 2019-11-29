import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  city:any;
  username: string;
password: string;
userId:string;
error:string;
url:string;
cid:string; 
urlnew:string;
cart:string;

  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params=>{this.city=params.get('city')});
    localStorage.setItem("city",this.city);
    console.log(this.city);
   }

  ngOnInit() {

    localStorage.setItem("city",this.city);
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

  }

    handleClick(city:any){
      localStorage.setItem("city",city);
      let url= "http://b8java18.iiht.tech:3000/showproduct?city="+city;
    fetch(url,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    .then(res => res.json())
    .then(data=> 
      {
      console.log(data)})
    }

    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      window.location.reload();
    }
  
}
