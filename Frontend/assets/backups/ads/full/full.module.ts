import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullRoutingModule } from './full-routing.module';
import { FullComponent } from './full.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FullComponent],
  imports: [
    CommonModule,
    FullRoutingModule,
    PipeModuleModule,
    FormsModule
  ]
})
export class FullModule { }
