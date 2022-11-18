import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserheaderComponent } from './userheader.component';

const routes: Routes = [{ path: '', component: UserheaderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserheaderRoutingModule { }
