import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { DropdownModule} from 'primeng/dropdown';
import { InputTextareaModule} from 'primeng/inputtextarea';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule, 
    InputTextModule,
    ButtonModule,
    PasswordModule,
    InputTextareaModule,
    DropdownModule
  ]
})
export class ResetPasswordModule { }
