import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditReceiverRoutingModule } from './edit-receiver-routing.module';
import { EditReceiverComponent } from './edit-receiver.component';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputTextModule} from 'primeng/inputtext';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import {TooltipModule} from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [EditReceiverComponent],
  imports: [
    CommonModule,
    EditReceiverRoutingModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    TooltipModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    BreadcrumbModule,
    TabViewModule,
    ToastModule,
    InputTextModule,
    SelectButtonModule,
    PipeModuleModule, 
    CalendarModule,
    InputMaskModule
  ]
})
export class EditReceiverModule { }
