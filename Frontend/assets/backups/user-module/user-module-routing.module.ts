import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mainModule } from 'process';
import { ReceiverGuard } from '../receiver.guard';
import { RestrictionGuard } from '../restriction.guard';
//import { AdlistComponent } from './adlist/adlist.component';
//import { AdpostComponent } from './adpost/adpost.component';
import { AgencyComponent } from './agency/agency.component';
import { FoodBankComponent } from './food-bank/food-bank.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';

import { UserModuleComponent } from './user-module.component';
import { UserauthGuard } from './userauth.guard';
import { UserdetailComponent } from './userdetail/userdetail.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'agencies', loadChildren: () => import('./agencies/agencies.module').then(m => m.AgenciesModule) },
    { path: 'foodbank', component: FoodBankComponent },
    { path: 'volunteer', loadChildren: ()=>import('./volunteer/volunteer.module').then(m=>m.VolunteerModule)},
    { path: 'myissues', loadChildren: () => import('./miscs/miscs.module').then(m => m.MiscsModule)},
    { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
    { path: 'verify-email', loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
    { path: 'donate', loadChildren: () => import('./donations/donations.module').then(m => m.DonationsModule)},
  ]},

    { path: 'ads', loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule) },

    { path: 'receiver', canActivate:[ReceiverGuard], component:UserdetailComponent,children:[
      { path: '', loadChildren: () => import('./adlist/adlist.module').then(m => m.AdlistModule) },
      { path: 'verification', loadChildren: () => import('./receiver-verification/receiver-verification.module').then(m => m.ReceiverVerificationModule) },
      { path: 'withdraw', canActivate: [RestrictionGuard], loadChildren: () => import('./withdraw-request/withdraw-request.module').then(m => m.WithdrawRequestModule) },
      { path: 'post', canActivate: [RestrictionGuard], loadChildren: () => import('./receiver-post/receiver-post.module').then(m => m.ReceiverPostModule)},
      {path: 'stats', canActivate: [RestrictionGuard], loadChildren: ()=>import('./stats/stats.module').then(m=>m.StatsModule)},
      { path: 'bumps', canActivate: [RestrictionGuard], loadChildren: () => import('./bumps/bumps.module').then(m => m.BumpsModule) },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
