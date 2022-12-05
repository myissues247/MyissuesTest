import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyAdsComponent } from './agency-ads/agency-ads.component';
import { AgencyManageComponent } from './agency-manage/agency-manage.component';

import { AgencyComponent } from './agency.component';
import { FullInfoComponent } from './full-info/full-info.component';
import { SingleAdComponent } from './single-ad/single-ad.component';

const routes: Routes = [
{ path: '', component: AgencyManageComponent},
{path: "full-info/:id", component: FullInfoComponent},
{path: "ads", component: AgencyAdsComponent },
{path: "ads/:agencyId", component: AgencyAdsComponent}, 
{path: "ad/:id", component: SingleAdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
