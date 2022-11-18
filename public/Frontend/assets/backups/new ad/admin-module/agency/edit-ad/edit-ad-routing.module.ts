import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAdComponent } from './edit-ad.component';

const routes: Routes = [{ path: '', component: EditAdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAdRoutingModule { }
