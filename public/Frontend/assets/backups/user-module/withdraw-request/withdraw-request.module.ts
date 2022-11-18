import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawRequestRoutingModule } from './withdraw-request-routing.module';
import { WithdrawRequestComponent } from './withdraw-request.component';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WithdrawRequestComponent],
  imports: [
    CommonModule,
    WithdrawRequestRoutingModule, 
    InputMaskModule,
    FormsModule
  ]
})
export class WithdrawRequestModule { }
