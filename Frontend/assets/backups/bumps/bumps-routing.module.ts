import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BumpsComponent } from './bumps.component';
import { CardPayComponent } from './card-pay/card-pay.component';
import { PurchaseBumpsComponent } from './purchase-bumps/purchase-bumps.component';

const routes: Routes = [{ path: '', component: BumpsComponent, children: [
  {path: 'purchase-bumps', component: PurchaseBumpsComponent},
  {path: 'pay-with-card', component: CardPayComponent} 
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BumpsRoutingModule { }
