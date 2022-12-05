import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserfooterComponent } from './userfooter.component';

const routes: Routes = [{ path: '', component: UserfooterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserfooterRoutingModule { }
