import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NavbarComponent} from './navbar.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule} from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext'
import {PasswordModule} from 'primeng/password';
import { InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import { NavbarRoutingModule } from './navbar-routing.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    InputTextareaModule,
    ButtonModule
  ],
  exports : [
    NavbarComponent
  ]
}) 
export class NavbarModule { } 
