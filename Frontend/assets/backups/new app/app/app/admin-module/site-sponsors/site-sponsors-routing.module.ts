import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteSponsorsComponent } from './site-sponsors.component';

const routes: Routes = [{ path: '', component: SiteSponsorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteSponsorsRoutingModule { }
