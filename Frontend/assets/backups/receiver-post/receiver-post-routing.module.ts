import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiverPostComponent } from './receiver-post.component';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { LocationComponent } from './location/location.component';
import { AdContentComponent } from './ad-content/ad-content.component';
import { PhotosComponent } from './photos/photos.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpgradesComponent } from './upgrades/upgrades.component';
import { FinalizeComponent } from './finalize/finalize.component';
const routes: Routes = [{ path: '', component: ReceiverPostComponent, children:[
   {path:'',redirectTo:'select-category',pathMatch:'full'},
  {path: 'select-category', component: SelectCategoryComponent},
  {path: 'select-location', component: LocationComponent},
  {path: 'ad-content', component: AdContentComponent},
  {path: "upload-images", component: PhotosComponent}, 
  {path: "user-details", component: UserDetailsComponent},
  {path:'upgrades',component:UpgradesComponent},
  {path:'finalize',component:FinalizeComponent},
  { path: 'pay-via-card', loadChildren: () => import('./card-payment/card-payment.module').then(m => m.CardPaymentModule) }
] }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiverPostRoutingModule { }
