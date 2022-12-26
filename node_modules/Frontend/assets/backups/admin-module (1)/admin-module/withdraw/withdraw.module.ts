import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WithdrawRoutingModule } from './withdraw-routing.module';
import { WithdrawComponent } from './withdraw.component';
import { AllwithdrawComponent } from './allwithdraw/allwithdraw.component';


import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [WithdrawComponent, AllwithdrawComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    BreadcrumbModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ToastModule,
    WithdrawRoutingModule
  ]
})
export class WithdrawModule { }
