import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { FullInfoComponent } from './full-info/full-info.component';
import { ManageComponent } from './manage/manage.component';
import { SingleAdComponent } from './single-ad/single-ad.component';

import { SponsorsComponent } from './sponsors.component';

const routes: Routes = [{ path: '', component: SponsorsComponent, children: [
  {path: "", redirectTo: 'manage', pathMatch: 'full'},
  {path: 'manage', component: ManageComponent},
  {path: 'full-info', component: FullInfoComponent},
  {path: 'full-info/:id', component: FullInfoComponent},
  {path: 'ads', component: AdsComponent},
  {path: 'ads/:sponsorId', component: AdsComponent},
  {path: 'ad/:id', component: SingleAdComponent},
  { path: 'ad/edit/:id', loadChildren: () => import('./edit-ad/edit-ad.module').then(m => m.EditAdModule) }
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorsRoutingModule { }
