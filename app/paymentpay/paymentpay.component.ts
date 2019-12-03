import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-paymentpay',
  templateUrl: './paymentpay.component.html',
  styleUrls: ['./paymentpay.component.css']
})
export class PaymentpayComponent implements OnInit {

  public payuform: any = {};
  disablePaymentButton: boolean = true;
  finalAmount: any;
  constructor(private http: HttpClient) { }

  confirmPayment() {


    const paymentPayload = {
      email: this.payuform.email,
      name: this.payuform.firstname,
      phone: this.payuform.phone,
      productInfo: this.payuform.productinfo,
      amount: this.payuform.amount
    }
    return this.http.post<any>('http://localhost:1234/payment/payment-details', paymentPayload).subscribe(
      data => {
        console.log(data);
        this.payuform.txnid = data.txnId;
        this.payuform.surl = data.sUrl;
        this.payuform.furl = data.fUrl;
        this.payuform.key = data.key;
        this.payuform.hash = data.hash;
        this.payuform.txnid = data.txnId;
        this.disablePaymentButton = false;

        
      },
      error1 => {
        console.log(error1);
      })

  }

  ngOnInit() {
    // var amount=document.getElementById("amount");
    //amount.value=localStorage.getItem('finalAmount');
    this.finalAmount = localStorage.getItem('finalAmount');
    console.log(this.finalAmount);
    (<HTMLOutputElement>document.getElementById("amount")).value = this.finalAmount;


  }


}