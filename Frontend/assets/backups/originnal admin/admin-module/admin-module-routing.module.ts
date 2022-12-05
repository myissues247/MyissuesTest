import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminModuleComponent } from './admin-module.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BannerComponent } from './banner/banner.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DonnerManageComponent } from './donner-manage/donner-manage.component';
import { ReceiverManageComponent } from './receiver-manage/receiver-manage.component';
import { AgencyManageComponent } from './agency-manage/agency-manage.component';
import { CompanyManageComponent } from './company-manage/company-manage.component';
import { DonateHouseComponent } from './donate-house/donate-house.component';
import { CommentsManageComponent } from './comments-manage/comments-manage.component';
import { SponsorManageComponent } from './sponsor-manage/sponsor-manage.component';
import { ProvinceManageComponent } from './province-manage/province-manage.component';
import { RegionManageComponent } from './region-manage/region-manage.component';
import { CityManageComponent } from './city-manage/city-manage.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { BumpComponent } from './bump/bump.component';
import { BumpOnHourComponent } from './bump-on-hour/bump-on-hour.component';
import { AdvertiseManageComponent } from './advertise-manage/advertise-manage.component';
import { SubscriptionManageComponent } from './subscription-manage/subscription-manage.component';
import { VolunteerManageComponent } from './volunteer-manage/volunteer-manage.component';
import { DiscussionManageComponent } from './discussion-manage/discussion-manage.component';
import { SiteSettingComponent } from './site-setting/site-setting.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { AgencyCategoryComponent } from './agency-category/agency-category.component';
import { AdminGuard } from '../admin.guard';
import { DonorEditComponent } from './donor-edit/donor-edit.component';

const routes: Routes = [
  //{path:'admin-signin',component:AdminSigninComponent},
 
  {path: '', component: AdminModuleComponent, children: [
    {path:'signin',component:AdminSigninComponent},
  
    {path:'',  canActivate: [AdminGuard], component:AdminComponent, children:[
      {path:'setting',component:AdminSettingComponent},
     
      {path:'advertise-manage',component:AdvertiseManageComponent},
      {path:'banner',component:BannerComponent},
      {path:'bump',component:BumpComponent},
      {path:'bump-hour',component:BumpOnHourComponent},
      {path:'category',component:CategoryManageComponent},
      {path:'city',component:CityManageComponent},
      {path:'comments',component:CommentsManageComponent},
      {path:'company',component:CompanyManageComponent},
      {path:'discussion',component:DiscussionManageComponent},
      {path:'donate',component:DonateHouseComponent},
      {path:'donner',component:DonnerManageComponent},
      {path: 'edit-donor/:donorId', component: DonorEditComponent},
      {path:'province',component:ProvinceManageComponent},
      {path:'receiver',component:ReceiverManageComponent},
      {path:'region',component:RegionManageComponent},
      {path:'site',component:SiteSettingComponent},
      // {path:'sponsor',component:SponsorManageComponent},
      {path:'subscription',component:SubscriptionManageComponent},
      {path:'transactions',component:TransactionComponent},
      {path:'user',component:UserManageComponent},
      {path:'volunteer',component:VolunteerManageComponent},
      //{path:'withdraw',component:WithdrawRequestComponent},
      {path:'receiverdetail',component:ReceiverComponent},
      {path:'volunteer',component:VolunteerManageComponent},
      // {path:'sponsor',component:SponsorManageComponent},
      {path:'agency-category',component:AgencyCategoryComponent},
      { path: 'sponsor', loadChildren: () => import('./sponsors/sponsors.module').then(m => m.SponsorsModule) },
      {path:'',component:AdminDashboardComponent},
      { path: 'agency', loadChildren: () => import('./agency/agency.module').then(m => m.AgencyModule) },
      { path: 'receiver-ads', loadChildren: () => import('./receiver-ads/receiver-ads.module').then(m => m.ReceiverAdsModule) },
      { path: 'withdraw', loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule) },
      { path: 'donations', loadChildren: () => import('./donations/donations.module').then(m => m.DonationsModule)}, 
      { path: 'queries', loadChildren: () => import('./queries/queries.module').then(m => m.QueriesModule) },
      { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'reports/:id', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'site-sponsors', loadChildren: () => import('./site-sponsors/site-sponsors.module').then(m => m.SiteSponsorsModule) },
      { path: 'donated-housings', loadChildren: () => import('./donate-housing/donate-housing.module').then(m => m.DonateHousingModule) },
    ]}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
