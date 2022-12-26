import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationsRoutingModule } from './donations-routing.module';
import { DonationsComponent } from './donations.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { DetailsComponent } from './details/details.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';




@NgModule({
  declarations: [DonationsComponent, CardComponent, DetailsComponent],
  imports: [
    CommonModule,
    DonationsRoutingModule, 
    FormsModule,
    PipeModuleModule,
    
  ]
})
export class DonationsModule { }
