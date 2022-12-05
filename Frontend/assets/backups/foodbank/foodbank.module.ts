import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodbankRoutingModule } from './foodbank-routing.module';
import { FoodbankComponent } from './foodbank.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';


@NgModule({
  declarations: [FoodbankComponent],
  imports: [
    CommonModule,
    FoodbankRoutingModule,
    PipeModuleModule
  ]
})
export class FoodbankModule { }
