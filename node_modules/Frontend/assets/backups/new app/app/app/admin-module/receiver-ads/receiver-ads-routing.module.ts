import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAdsComponent } from './all-ads/all-ads.component';
import { ReceiverManageComponent } from './receiver-manage/receiver-manage.component';
import { SingleAdComponent } from './single-ad/single-ad.component';
import { SingleComponent } from './single/single.component';

const routes: Routes = [{ path: '', component:ReceiverManageComponent },
{path: 'ads', component: AllAdsComponent},
{path: 'ads/:id', component: AllAdsComponent},
{path:'single/:id',component:SingleAdComponent},
{path: 'full/:id', component: SingleComponent},
{ path: 'edit/:id', loadChildren: () => import('./edit-ad/edit-ad.module').then(m => m.EditAdModule) },
{ path: 'receiver-edit/:id', loadChildren: () => import('./edit-receiver/edit-receiver.module').then(m => m.EditReceiverModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiverAdsRoutingModule { }
