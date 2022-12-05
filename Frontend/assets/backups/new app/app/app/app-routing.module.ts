import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AgencyGuard } from './agency.guard';
import { DonerGuard } from './doner.guard';
import { SponsorGuard } from './sponsor.guard';

const routes: Routes = [
  { path: 'admin-module', loadChildren: () => import('./admin-module/admin-module.module').then(m => m.AdminModuleModule) },
  { path: '', loadChildren: () => import('./user-module/user-module.module').then(m => m.UserModuleModule) },
  { path: 'doner', canActivate: [DonerGuard], loadChildren: () => import('./doner-module/doner-module.module').then(m => m.DonerModuleModule) },
  { path: 'agency', canActivate: [AgencyGuard], loadChildren: () => import('./agency-module/agency-module.module').then(m => m.AgencyModuleModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'sponsor',  canActivate: [SponsorGuard], loadChildren: () => import('./sponsors/sponsors.module').then(m => m.SponsorsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
