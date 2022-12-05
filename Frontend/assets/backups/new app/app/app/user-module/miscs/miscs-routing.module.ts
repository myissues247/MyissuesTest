import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { YourDonationsComponent } from './your-donations/your-donations.component';
import { FoodbankComponent } from './foodbank/foodbank.component';
import { LiveservicesComponent } from './liveservices/liveservices.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { MiscsComponent } from './miscs.component';

const routes: Routes = [{ path: '', component: MiscsComponent, children: [
  {path: 'how-it-works', component: HowItWorksComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'ad-donors', component: YourDonationsComponent},
  {path: 'ad-foodbank', component: FoodbankComponent},
  {path: 'ad-live-services', component: LiveservicesComponent},
  {path: 'privacy-policy', component : PrivacyPolicyComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscsRoutingModule { }
