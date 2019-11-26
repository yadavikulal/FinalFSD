import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
cid:any
List:any
address:any;
amount:any;
data:number;
plusval:any;
quantity:any;
url:string;
period:any;
plusval2:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.quantity=1;
    this.period=1;
    this.cid=localStorage.getItem('token');
    
    let url3="http://b8java18.iiht.tech:3000/viewcart?cid="+this.cid;
    fetch(url3,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      this.List=data;
      setTimeout(function(){
        var sum=0;
        for(let i of data){
          let id="subtotal"+i.productid;
          console.log(id);
          var p=+(<HTMLInputElement>document.getElementById(id)).innerText;
         sum=sum+p;
         (<HTMLOutputElement>document.getElementById('amount')).innerHTML=String(sum);
      (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML=String(sum+50);
        }
      },1000)
      
    })
    
    let url4=`http://b8java18.iiht.tech:3000/findcustomer/`+this.cid;
    fetch(url4,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      this.address=data[0].customeraddress;
    })
  
  }

    plus(id:any){
      console.log(id);
      let elementid="input"+id;
      console.log(elementid);
     this.plusval=+((<HTMLInputElement>document.getElementById(elementid)).value);
     console.log(this.plusval);
     var price="price"+id;
     var subtotal=+((<HTMLInputElement>document.getElementById(price)).innerHTML);
     this.quantity=this.plusval+1;
     (<HTMLOutputElement>document.getElementById(elementid)).value=String(this.quantity);
     console.log(subtotal*this.quantity*this.period);
     let subtot="subtotal"+id;
     (<HTMLOutputElement>document.getElementById(subtot)).innerHTML=String(this.quantity*subtotal*this.period);
     var sum=0;
     for (let i of this.List) {
       let id="subtotal"+i.productid;
       console.log(id);
       var p=+(<HTMLInputElement>document.getElementById(id)).innerText;
      sum=sum+p;
      }
     (<HTMLOutputElement>document.getElementById('amount')).innerHTML=String(sum);
     (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML=String(sum+50);
    }

    minus(id:any){
      console.log(id);
      let elementid="input"+id;
     this.plusval=+((<HTMLInputElement>document.getElementById(elementid)).value);
     var price="price"+id;
     var subtotal=+((<HTMLInputElement>document.getElementById(price)).innerHTML);
     if(this.plusval>1){
      this.quantity=this.plusval-1;
      (<HTMLOutputElement>document.getElementById(elementid)).value=String(this.quantity);
      console.log(subtotal*this.quantity*this.period);
      let subtot="subtotal"+id;
      (<HTMLOutputElement>document.getElementById(subtot)).innerHTML=String(this.quantity*subtotal*this.period);
      var sum=0;
      for (let i of this.List) {
        let id="subtotal"+i.productid;
        console.log(id);
        var p=+(<HTMLInputElement>document.getElementById(id)).innerText;
       sum=sum+p;
       }
      (<HTMLOutputElement>document.getElementById('amount')).innerHTML=String(sum);
      (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML=String(sum+50);
     }
     
    }

    deleteitem(pid:any){
      let url="http://b8java18.iiht.tech:3000/deleteitem?pid="+pid+"&cid="+this.cid;
      fetch(url,{
        method:"GET",
        headers:{
          "content-type":"application/json"
        }
      })
      window.location.reload();
    }

    addmore(){
      console.log("addmore");
      let city=localStorage.getItem('city');
      this.router.navigate(['homepage/'+city]);
    }

    checkout(){
      let status:any
      for(let i of this.List){
        let productid=i.productid;
        let quantid="input"+i.productid;
        let quantity=+(<HTMLOutputElement>document.getElementById(quantid)).value;
        console.log(quantity+" "+productid);
        let url="http://b8java18.iiht.tech:3000/savecart/"+this.cid+"/"+productid+"/"+quantity;
        fetch(url,{
          method:"GET",
          headers:{
            "content-type":"application/json"
          }
        }).then(res=>res.json()).then(data=>{
          console.log(data[0]);
          if(data[0]=="unsuccessfull"){
            status ="unsuccessfull";
          };
        })
        
      }

      setTimeout(()=>  {
        console.log(status);
        if(status=="unsuccessfull"){
          alert("Not enough quantity in stock. Reduce the quantity");
        }
        else{
        let finalamount=(<HTMLOutputElement>document.getElementById('finalamount')).innerText;
        localStorage.setItem('amount',finalamount);
        this.router.navigate(['cartverify']);
        }
      },1000)
        
      
    }


    timeplus(id:any){
      
      console.log(id);
      let elementid="period"+id;
      console.log(elementid);
     this.plusval2=+((<HTMLInputElement>document.getElementById(elementid)).value);
     console.log(this.quantity+" "+this.plusval2);
     var price="price"+id;
     var subtotal=+((<HTMLInputElement>document.getElementById(price)).innerHTML);

     if(this.plusval2<=6){
     this.period=this.plusval2+1;
     (<HTMLOutputElement>document.getElementById(elementid)).value=String(this.period);
     console.log(subtotal+" "+this.quantity+" "+this.period);
     let subtot="subtotal"+id;
     (<HTMLOutputElement>document.getElementById(subtot)).innerHTML=String(this.quantity*subtotal*this.period);
     var sum=0;
     for (let i of this.List) {
       let id="subtotal"+i.productid;
       console.log(id);
       var p=+(<HTMLInputElement>document.getElementById(id)).innerText;
      sum=sum+p;
      }
     (<HTMLOutputElement>document.getElementById('amount')).innerHTML=String(sum);
     (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML=String(sum+50);
    }
    }


    timeminus(id:any){
      console.log(id);
      let elementid="period"+id;
     this.plusval2=+((<HTMLInputElement>document.getElementById(elementid)).value);
     var price="price"+id;
     var subtotal=+((<HTMLInputElement>document.getElementById(price)).innerHTML);
     if(this.plusval2>1){
      this.period=this.plusval2-1;
      (<HTMLOutputElement>document.getElementById(elementid)).value=String(this.period);
      console.log(subtotal*this.quantity*this.period);
      let subtot="subtotal"+id;
      (<HTMLOutputElement>document.getElementById(subtot)).innerHTML=String(this.quantity*subtotal*this.period);
      var sum=0;
      for (let i of this.List) {
        let id="subtotal"+i.productid;
        console.log(id);
        var p=+(<HTMLInputElement>document.getElementById(id)).innerText;
       sum=sum+p;
       }
      (<HTMLOutputElement>document.getElementById('amount')).innerHTML=String(sum);
      (<HTMLOutputElement>document.getElementById('finalamount')).innerHTML=String(sum+50);
     }
    }

}
