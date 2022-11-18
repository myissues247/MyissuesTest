import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestrictionGuard } from '../restriction.guard';

import { AgencyModuleComponent } from './agency-module.component';

const routes: Routes = [{ path: '', component: AgencyModuleComponent, children: [
  {path: '', loadChildren: ()=>import('../user-module/adlist/adlist-routing.module').then(m=>m.AdlistRoutingModule)},
  { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) }, 
  {path: 'post', canActivate: [RestrictionGuard] ,loadChildren: ()=>import('./receiver-post/receiver-post.module').then(m=>m.ReceiverPostModule)},
  {path: 'bumps', canActivate: [RestrictionGuard], loadChildren: ()=>import('./bumps/bumps.module').then(m=>m.BumpsModule)},
  {path: 'stats', canActivate: [RestrictionGuard], loadChildren: ()=>import('../user-module/stats/stats.module').then(m=>m.StatsModule)},
  { path: 'payment-status', loadChildren: () => import('../payment-status/payment-status.module').then(m => m.PaymentStatusModule) },
]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyModuleRoutingModule { }
