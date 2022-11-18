import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component'
import { FormsModule } from '@angular/forms';

import { DropdownModule} from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext'
import {PasswordModule} from 'primeng/password';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    PasswordModule
  ], 
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
