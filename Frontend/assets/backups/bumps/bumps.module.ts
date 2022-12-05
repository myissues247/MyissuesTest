import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BumpsRoutingModule } from './bumps-routing.module';
import { BumpsComponent } from './bumps.component';
import { CardPayComponent } from './card-pay/card-pay.component';
import { FormsModule } from '@angular/forms';
import { PurchaseBumpsComponent } from './purchase-bumps/purchase-bumps.component';
import { UsernavbarModule } from '../../user-module/usernavbar/usernavbar.module';
import { UserheaderModule } from '../../user-module/userheader/userheader.module';
import { UserfooterModule } from '../../user-module/userfooter/userfooter.module';

@NgModule({
  declarations: [BumpsComponent, CardPayComponent, PurchaseBumpsComponent],
  imports: [
    CommonModule,
    BumpsRoutingModule,
    FormsModule,
    UsernavbarModule,
    UserheaderModule,
    UserfooterModule
  ]
})
export class BumpsModule { }
