import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscsRoutingModule } from './miscs-routing.module';
import { MiscsComponent } from './miscs.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';


@NgModule({
  declarations: [MiscsComponent, HowItWorksComponent],
  imports: [
    CommonModule,
    MiscsRoutingModule
  ]
})
export class MiscsModule { }
