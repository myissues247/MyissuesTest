import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscsRoutingModule } from './miscs-routing.module';
import { MiscsComponent } from './miscs.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { YourDonationsComponent } from './your-donations/your-donations.component';
import { FoodbankComponent } from './foodbank/foodbank.component';
import { LiveservicesComponent } from './liveservices/liveservices.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [MiscsComponent, HowItWorksComponent, AboutUsComponent, YourDonationsComponent, FoodbankComponent, LiveservicesComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    MiscsRoutingModule
  ]
})
export class MiscsModule { }
