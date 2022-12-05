import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciesRoutingModule } from './agencies-routing.module';
import { AgenciesComponent } from './agencies.component';

import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
@NgModule({
  declarations: [AgenciesComponent],
  imports: [
    CommonModule,
    AgenciesRoutingModule,
    CarouselModule,
    FormsModule,
    PipeModuleModule
  ]
})
export class AgenciesModule { }
