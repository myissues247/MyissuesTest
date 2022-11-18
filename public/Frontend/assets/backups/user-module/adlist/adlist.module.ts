import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdlistRoutingModule } from './adlist-routing.module';
import { AdlistComponent } from './adlist.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';



@NgModule({
  declarations: [AdlistComponent],
  imports: [
    CommonModule,
    AdlistRoutingModule,
    PipeModuleModule
  ]
})
export class AdlistModule { }
