import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiverVerificationRoutingModule } from './receiver-verification-routing.module';
import { ReceiverVerificationComponent } from './receiver-verification.component';
import { StepsModule } from 'primeng/steps';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { GetuserComponent } from './getuser/getuser.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PetinfoComponent } from './petinfo/petinfo.component';
import { NeighbourinfoComponent } from './neighbourinfo/neighbourinfo.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [ReceiverVerificationComponent, PetinfoComponent, ConfirmComponent, NeighbourinfoComponent, GetuserComponent],
  imports: [
    CommonModule,
    ReceiverVerificationRoutingModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    StepsModule,
    CalendarModule,
    PipeModuleModule,
    ConfirmDialogModule
  ]
})
export class ReceiverVerificationModule { }
