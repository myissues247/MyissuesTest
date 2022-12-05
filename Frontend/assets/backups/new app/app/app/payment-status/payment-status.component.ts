import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route} from '@angular/router';

interface Params {
  receiverName?: string,
  amount: any,
  transactionId: number, 
  paymentIntentId: number,
  adId?: string,
  type: string,
  success: string,
  bumps? : number,
  error? : string,
  tip? : any,
  date: Date,
  backLink: string,
}
 

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  amountInt: any;
  tipInt: any;
  success : boolean;
  message : string = 'Payment Unsuccessful';
  params  : Params = {} as Params;
  backLink : string;
  backParams: any;
  constructor(private ar : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
     this.ar.queryParams.subscribe((params : Params)=>{
       if(params.type == 'donation') {
         console.log(params)
          this.params = params;
          this.amountInt = Number(this.params.amount).toFixed(2);
          this.tipInt = Number(this.params.tip).toFixed(2);
          if(params.success == "true") {
            this.success = true;
          } else {
            this.success = false;
          }
        } else if(params.type == 'purchase') {
          this.params  = params;
          this.amountInt = Number(this.params.amount).toFixed(2);
          this.backLink = this.params.backLink;
          if(this.params.adId)
            this.backParams = {adId: this.params.adId};
         if(params.success == "true") {
           this.success = true;
         } else {
           this.success = false;
         }
       }
     })
  }

  goBack() {
    this.router.navigate([this.backLink], {queryParams: this.backParams, relativeTo: this.ar})
  }

}
