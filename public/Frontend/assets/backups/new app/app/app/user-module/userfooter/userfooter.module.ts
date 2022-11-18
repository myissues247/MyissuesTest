import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserfooterRoutingModule } from './userfooter-routing.module';
import { UserfooterComponent } from './userfooter.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserfooterComponent],
  imports: [
    CommonModule,
    UserfooterRoutingModule,
    FormsModule,
    PipeModuleModule
  ],
  exports:[ UserfooterComponent ]
})
export class UserfooterModule { }
