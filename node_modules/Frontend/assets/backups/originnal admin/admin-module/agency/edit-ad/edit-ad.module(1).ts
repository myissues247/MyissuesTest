import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditAdRoutingModule } from './edit-ad-routing.module';
import { EditAdComponent } from './edit-ad.component';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {SelectButtonModule} from 'primeng/selectbutton';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [EditAdComponent],
  imports: [
    CommonModule,
    EditAdRoutingModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    BreadcrumbModule,
    TabViewModule,
    ToastModule,
    SelectButtonModule,
    PipeModuleModule,
    EditorModule,
    InputMaskModule
  ]
})
export class EditAdModule { }
