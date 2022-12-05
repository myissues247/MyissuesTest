import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodbankComponent } from './foodbank.component';

const routes: Routes = [{ path: '', component: FoodbankComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodbankRoutingModule { }
