import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [VerificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputMaskModule,
    VerificationRoutingModule,
    CalendarModule,
    PipeModuleModule,
    EditorModule
  ]
})
export class VerificationModule { }
