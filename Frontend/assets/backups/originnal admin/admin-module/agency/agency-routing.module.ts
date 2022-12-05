import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAgencyComponent } from './add-agency/add-agency.component';
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
{path: "ad/:id", component: SingleAdComponent},
{path: "new", component: AddAgencyComponent},
{path: ":edit/:agencyId", component: AddAgencyComponent},
{ path: 'ad/edit/:id', loadChildren: () => import('./edit-ad/edit-ad.module').then(m => m.EditAdModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
