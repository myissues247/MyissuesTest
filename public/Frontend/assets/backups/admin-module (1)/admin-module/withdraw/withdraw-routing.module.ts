import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllwithdrawComponent } from './allwithdraw/allwithdraw.component';

import { WithdrawComponent } from './withdraw.component';

const routes: Routes = [{ path: '', component: AllwithdrawComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawRoutingModule { }
