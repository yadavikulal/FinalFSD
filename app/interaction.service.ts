import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

   private _accountInfoSource= new BehaviorSubject<accountInfo>(null);
   public accountInfo$ = this._accountInfoSource.asObservable();
  constructor() { }

  sendMessage(message:accountInfo){
    this._accountInfoSource.next(message);
    console.log(message)
    console.log("interaction message")
  }
}


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
