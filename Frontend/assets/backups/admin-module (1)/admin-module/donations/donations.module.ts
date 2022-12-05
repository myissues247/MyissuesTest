import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonationsRoutingModule } from './donations-routing.module';
import { DonationsComponent } from './donations.component';

import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';

@NgModule({
  declarations: [DonationsComponent],
  imports: [
    CommonModule,
    DonationsRoutingModule,
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
    PipeModuleModule
  ]
})
export class DonationsModule { }
