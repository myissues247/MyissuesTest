import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';

@NgModule({
  declarations: [VerificationComponent],
  imports: [
    CommonModule,
    VerificationRoutingModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    PipeModuleModule
  ]
})
export class VerificationModule { }
