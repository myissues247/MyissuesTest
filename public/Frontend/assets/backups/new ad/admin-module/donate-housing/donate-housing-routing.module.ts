import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleComponent } from './single/single.component';
import { AllComponent } from './all/all.component';

import { DonateHousingComponent } from './donate-housing.component';
import { NeedyadsComponent } from './needyads/needyads.component';
import { NeedyadsfullComponent } from './needyadsfull/needyadsfull.component';

const routes: Routes = [{ path: '', component: DonateHousingComponent, children: [
  {path: '', redirectTo: 'all', pathMatch: 'full'},
  {path: 'all', component: AllComponent},
  {path: 'full/:id', component: SingleComponent},
  {path: 'ads/:houseId', component: NeedyadsComponent},
  {path: 'ads/:id/:houseId', component: NeedyadsfullComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateHousingRoutingModule { }
