import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserheaderRoutingModule } from './userheader-routing.module';
import { UserheaderComponent } from './userheader.component';


@NgModule({
  declarations: [UserheaderComponent],
  imports: [
    CommonModule,
    UserheaderRoutingModule
  ],
  exports:[UserheaderComponent]
})
export class UserheaderModule { }
