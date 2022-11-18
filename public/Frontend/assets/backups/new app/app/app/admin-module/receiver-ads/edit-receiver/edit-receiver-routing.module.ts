import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditReceiverComponent } from './edit-receiver.component';

const routes: Routes = [{ path: '', component: EditReceiverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditReceiverRoutingModule { }
