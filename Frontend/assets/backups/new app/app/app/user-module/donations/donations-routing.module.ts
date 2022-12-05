import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { DetailsComponent } from './details/details.component';

import { DonationsComponent } from './donations.component';

const routes: Routes = [{ path: '', component: DonationsComponent, children: [
  {path: 'details', component: DetailsComponent},
  {path: 'pay', component: CardComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationsRoutingModule { }
