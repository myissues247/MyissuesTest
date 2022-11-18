import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardPaymentComponent } from './card-payment.component';

const routes: Routes = [{ path: '', component: CardPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPaymentRoutingModule { }
