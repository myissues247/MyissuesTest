import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueriesComponent } from './queries.component';

const routes: Routes = [{ path: '', component: QueriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueriesRoutingModule { }
