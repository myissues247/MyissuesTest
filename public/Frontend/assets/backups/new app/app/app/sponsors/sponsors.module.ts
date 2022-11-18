import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsRoutingModule } from './sponsors-routing.module';
import { SponsorsComponent } from './sponsors.component';
import { UsernavbarModule } from '../user-module/usernavbar/usernavbar.module';
import { UserheaderModule } from '../user-module/userheader/userheader.module';
import { UserfooterModule } from '../user-module/userfooter/userfooter.module';

@NgModule({
  declarations: [SponsorsComponent],
  imports: [
    CommonModule,
    SponsorsRoutingModule,
    UsernavbarModule,
    UserheaderModule,
    UserfooterModule
  ]
})
export class SponsorsModule { }
