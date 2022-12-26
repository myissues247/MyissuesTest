import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BumpsRoutingModule } from './bumps-routing.module';
import { BumpsComponent } from './bumps.component';
import { CardPayComponent } from './card-pay/card-pay.component';
import { FormsModule } from '@angular/forms';
import { PurchaseBumpsComponent } from './purchase-bumps/purchase-bumps.component';
import { UserfooterModule} from '../userfooter/userfooter.module';
import { UserheaderModule} from '../userheader/userheader.module';
import { UsernavbarModule} from '../usernavbar/usernavbar.module';
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
