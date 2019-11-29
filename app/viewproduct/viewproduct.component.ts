import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
  @ViewChild('closeModal',undefined) closeModal:ElementRef;
city:any;
List:any;
List2:any;
pid:any;
myFullresImage:any;
myThumbnail:any;
cid:string; 
urlnew:string;
cart:string;
username:string;
cartlist:any;

  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{ this.pid=params['pid'], this.city=params['city']});
     }

  ngOnInit() {
    this.cid =localStorage.getItem('id');
    if(this.cid!=undefined){ 
    this.urlnew = 'http://b8java18.iiht.tech:3000/findcustomerid/'+this.cid;
    fetch(this.urlnew)
    .then(res=>res.json())
    .then(data=>{
      this.username=data[0].customername;      
    })
  }
  else{
   this.username='noLoggedInUser'
  }

    let url= "http://b8java18.iiht.tech:3000/showproductbyid/"+ this.pid;
      fetch(url,{
        method:"GET",
        // headers:{
        //   "content-type":"application/json"
        // }
      })
      .then(res => res.json())
      .then(data=> 
        {
          console.log(data)
        this.List=data;
        
        this.myFullresImage="https://github.com/demanda1/Project/blob/master/images/mahindra-scorpio1.png?raw=true"
        // this.myFullresImage=data[0].productimage;
        // this.myThumbnail=data[0].productimage;
        this.myThumbnail="https://github.com/demanda1/Project/blob/master/images/mahindra-scorpio1.png?raw=true"
      })

 

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
        this.cartlist=data;
        if(data!=null){
          this.cart='items';
        }
        else{
          this.cart='noitems';
        }
        console.log(this.cartlist);
      })



      let url2= "http://b8java18.iiht.tech:3000/showallproduct?city="+this.city;
    fetch(url2,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    .then(res => res.json())
    .then(data=> 
      {
        console.log(data)
      this.List2=data;
    })


  }

  addtocart(pid:any){
    console.log("bought the product",pid);
    this.cid=localStorage.getItem('id');
    let buy="yes";
    for(let i in this.cartlist){
      if(this.cartlist[i].productid==pid){
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
    .then(res=>res.text())
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
  localStorage.removeItem('id');
  window.location.reload();
}

}


