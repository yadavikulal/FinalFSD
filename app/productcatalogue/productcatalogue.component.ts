import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productcatalogue',
  templateUrl: './productcatalogue.component.html',
  styleUrls: ['./productcatalogue.component.css']
})
export class ProductcatalogueComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
  @ViewChild('closeModal',undefined) closeModal:ElementRef;
 city:any;
 category:any;
 List:any
 username:string;
  userid:string;
  key:'123456$#@$^@1ERF';
  _url:any;
  cid:any;
  cart:string;
  addurl:any;
  cartlist:any;
   
  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{ this.category=params['category'],this.city=params['city']});
    }

  ngOnInit() {
    this.loggedInUser();
    this.city=localStorage.getItem('city');
    let url= "http://b8java18.iiht.tech:3000/showproduct?category="+this.category+"&city="+this.city;
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
      this.List=data;
    })

    this.cid=localStorage.getItem('token');
    let url3="http://b8java18.iiht.tech:3000/viewcart?cid="+this.cid;
  fetch(url3,{
    method:"GET",
    headers:{
      "content-type":"application/json"
    }
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    this.cartlist=data;
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
      let url= "http://b8java18.iiht.tech:3000/showproduct?category="+this.category+"&city="+city;
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
        this.List=data;
      })
    }
    handleClick2(category:any){
      localStorage.setItem("city",this.city);
      let url= "http://b8java18.iiht.tech:3000/showproduct?category="+category+"&city="+this.city;
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
        this.List=data;
      })
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
  }

  addtocart(pid:any){
    console.log("bought the product",pid);
    this.cid=localStorage.getItem('token');
    let buy="yes";
    for(let i of this.cartlist){
      if(i.productid==pid){
        console.log("no")
        buy="no";
      }
    }
    if(this.cid!==undefined && buy=="yes"){
    let addurl="http://b8java18.iiht.tech:3000/mycart/"+pid+"/"+this.cid;
    fetch(addurl,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data!=null){
        this.openModal.nativeElement.click();
      }
    })
  }
  else{
    this.closeModal.nativeElement.click();
  }
}
  

logout(){
  localStorage.removeItem('token');
  window.location.reload();
}

}
