import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyModuleRoutingModule } from './agency-module-routing.module';
import { AgencyModuleComponent } from './agency-module.component';
import { UsernavbarModule } from '../user-module/usernavbar/usernavbar.module';
import { UserheaderModule } from '../user-module/userheader/userheader.module';
import { UserfooterModule } from '../user-module/userfooter/userfooter.module';


@NgModule({
  declarations: [AgencyModuleComponent],
  imports: [
    CommonModule,
    AgencyModuleRoutingModule,
    UsernavbarModule,
    UserheaderModule,
    UserfooterModule
  ]
})
export class AgencyModuleModule { }
