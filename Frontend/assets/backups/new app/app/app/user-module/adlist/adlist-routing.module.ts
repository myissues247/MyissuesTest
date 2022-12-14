import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdlistComponent } from './adlist.component';

const routes: Routes = [{ path: '', component: AdlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdlistRoutingModule { }
