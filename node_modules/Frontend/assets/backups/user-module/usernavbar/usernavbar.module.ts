import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsernavbarRoutingModule } from './usernavbar-routing.module';
import { UsernavbarComponent } from './usernavbar.component';
import { NotificationsModule } from 'src/app/notifications/notifications.module';


@NgModule({
  declarations: [UsernavbarComponent],
  imports: [
    CommonModule,
    UsernavbarRoutingModule,
    NotificationsModule
  ],
  exports:[ UsernavbarComponent ]
})
export class UsernavbarModule { }
