import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

import { MiscsComponent } from './miscs.component';

const routes: Routes = [{ path: '', component: MiscsComponent, children: [
  {path: 'how-it-works', component: HowItWorksComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscsRoutingModule { }
