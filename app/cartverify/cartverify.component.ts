import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Component({
  selector: 'app-cartverify',
  templateUrl: './cartverify.component.html',
  styleUrls: ['./cartverify.component.css']
})
export class CartverifyComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
  @ViewChild('submitbtn',undefined) submitbtn:ElementRef;

  public payuform: any = {};
  disablePaymentButton: boolean = true;
  

  idtype:any;
  idnum:any;
  cid:any;
  myid:any;
  wallet:any;
  amount:any;
  active:String;
  invoicelist:any;
  clist:any;
  clist2:any[]=[];
  tablerows:any;
  name:any;
  email:any;
  productInfo:any;
         phone:any;
         surl:any;
         furl:any;
         key:any;
         txnid:any;

  constructor(private http: HttpClient,private router:Router) { 

  }

  ngOnInit() {
    this.tablerows="";
    this.amount=+localStorage.getItem('amount');
    localStorage.removeItem('amount');
    ((<HTMLInputElement>document.getElementById("spinner")).hidden=true);
    this.cid=localStorage.getItem('id');
    let url=`http://b8java18.iiht.tech:3000/findcustomerid/`+this.cid;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.name=data[0].customername;
      this.email=data[0].customeremail;
      this.wallet=+data[0].customerwallet; 
      console.log(this.wallet+" "+this.amount);
      this.active="active";
      if(this.wallet<=this.amount){
        console.log("deactivated")
        this.active="inactive";
      }    
    })

    let url3="http://b8java18.iiht.tech:3000/viewcart/"+this.cid;
     fetch(url3,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      this.invoicelist=data;
    })
    setTimeout(()=>{
    let url4="http://b8java18.iiht.tech:3000/seecart?cid="+this.cid;
    fetch(url4,{
     method:"GET",
     headers:{
       "content-type":"application/json"
     }
   }).then(res=>res.json())
   .then(data=>{
     console.log(data);
     this.clist=data;
   })

   setTimeout(()=>{
   let x=0;
   for(let i of this.clist){
      this.clist2.push(i.quantity);
      console.log(this.clist2[x]);
      x++;
   }
  },2000)

},2000)
    
    
  }

  pay(){
    this.idtype=((<HTMLOutputElement>document.getElementById("idtype")).value);
    this.idnum=((<HTMLOutputElement>document.getElementById("idnum")).value);
    ((<HTMLInputElement>document.getElementById("idtype")).disabled=true);
    ((<HTMLInputElement>document.getElementById("idnum")).disabled=true);
    ((<HTMLInputElement>document.getElementById("submit")).disabled=true);
    ((<HTMLInputElement>document.getElementById("paybtn")).disabled=false);
    ((<HTMLInputElement>document.getElementById("walletbtn")).disabled=false);
    
    this.myid=this.idtype +"-"+this.idnum.toUpperCase();
    console.log(this.myid);
    let url="http://b8java18.iiht.tech:3000/setidproof?idnum="+this.myid+"&cid="+this.cid;
    fetch(url,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      }
    })


    const paymentPayload = {
      name: this.name,
      email: this.email,
      productInfo: "My Product",
      amount: this.amount,

    }
    return this.http.post<any>('http://b8java18.iiht.tech:3000/payment-details', paymentPayload).subscribe(
      data => {
      console.log(data)
      this.payuform.productinfo="My Product";
      this.payuform.firstname=paymentPayload.name;
      this.payuform.email=paymentPayload.email;
      this.payuform.amount=paymentPayload.amount;
      this.payuform.surl = data.surl;
      this.payuform.furl = data.furl;
      this.payuform.key = data.key;
      this.payuform.hash = data.hash;
      this.payuform.txnid = data.txnId;
    }, error1 => {
        console.log(error1);
      })
      
  }

  transaction(){
    let url="http://b8java18.iiht.tech:3000/walletpayment?cid="+this.cid+"&amount="+this.amount;
    fetch(url).then(res=>res.json())
    .then(data=>{
      console.log(data[0]);
      if(data[0]=="success"){
        let url="http://b8java18.iiht.tech:3000/checkout?cid="+this.cid+"&status=success";
      fetch(url)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data[0]!=null){
          ((<HTMLInputElement>document.getElementById("spinner")).hidden=false);
          setTimeout(()=>{
            this.openModal.nativeElement.click();
            (<HTMLInputElement>document.getElementById("spinner")).hidden=true;;
          },3000)
        }
        
    
      setTimeout(()=>{
      let x=0;
      for(let i of this.invoicelist){
      this.tablerows+="<tr><td><img src='"+i.productimage+"' style='width:50px;'></td><td>"+i.productname+"</td><td>"+this.clist2[x]+"</td><td>"+i.productprice+"</td></tr>";
      x++;
    }
      this.tablerows+="<tr><td></td><td></td><td>Total Amount: </td><td>"+this.amount+"</td></tr>";
      setTimeout(()=>{
        console.log("Invoice email activated" +this.tablerows);
        let url3="http://b8java18.iiht.tech:3000/sendinvoice";
        fetch(url3,{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body : JSON.stringify({
            name:this.name,
            to:this.email,
            subject:"Rentastic Invoice for the Orders",
            body:this.tablerows
        })
        }).then(res=>res.json())
        .then(data=>{
          })
      },3000)
     console.log("invoice sent");

    },3000)

        
  })
    }
  })



  }

  portal(){
   // this.submitbtn.nativeElement.click();
   this.router.navigate(['paymentpay']);
  }
}
