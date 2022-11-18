import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolunteerRoutingModule } from './volunteer-routing.module';
import { VolunteerComponent } from './volunteer.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [VolunteerComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    PasswordModule,
    DropdownModule,
    VolunteerRoutingModule
  ]
})
export class VolunteerModule { }
