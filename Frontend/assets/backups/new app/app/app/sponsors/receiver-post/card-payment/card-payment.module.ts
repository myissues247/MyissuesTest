import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPaymentRoutingModule } from './card-payment-routing.module';
import { CardPaymentComponent } from './card-payment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CardPaymentComponent],
  imports: [
    CommonModule,
    FormsModule, 
    CardPaymentRoutingModule
  ]
})
export class CardPaymentModule { }
