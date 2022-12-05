import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueriesRoutingModule } from './queries-routing.module';
import { QueriesComponent } from './queries.component';

import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [QueriesComponent],
  imports: [
    CommonModule,
    QueriesRoutingModule,
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
  ]
})
export class QueriesModule { }
