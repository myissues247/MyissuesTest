import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonerModuleRoutingModule } from './doner-module-routing.module';
import { DonerModuleComponent } from './doner-module.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserheaderModule } from '../user-module/userheader/userheader.module';
import { UserfooterModule } from '../user-module/userfooter/userfooter.module';
import { UsernavbarModule } from '../user-module/usernavbar/usernavbar.module';
import { DonerHomeComponent } from './doner-home/doner-home.component';
@NgModule({
  declarations: [DonerModuleComponent, DonerHomeComponent],
  imports: [
    CommonModule,
    DonerModuleRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    UserheaderModule,
    UserfooterModule,
    UsernavbarModule
  ]
})
export class DonerModuleModule { }
