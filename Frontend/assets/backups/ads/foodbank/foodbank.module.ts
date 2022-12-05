import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodbankRoutingModule } from './foodbank-routing.module';
import { FoodbankComponent } from './foodbank.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FoodbankComponent],
  imports: [
    CommonModule,
    FoodbankRoutingModule,
    PipeModuleModule,
    FormsModule
  ]
})
export class FoodbankModule { }
