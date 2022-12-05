import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonerHomeComponent } from './doner-home/doner-home.component';

import { DonerModuleComponent } from './doner-module.component';

const routes: Routes = [
  { path: '', component: DonerModuleComponent, children: [
    {path: '', component: DonerHomeComponent},
    { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
    {path: 'stats', loadChildren: ()=> import('./stats/stats.module').then(m => m.StatsModule)}
  ]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonerModuleRoutingModule { }
