import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteSponsorsRoutingModule } from './site-sponsors-routing.module';
import { SiteSponsorsComponent } from './site-sponsors.component';
import {ButtonModule} from 'primeng/button';

import {PanelMenuModule} from 'primeng/panelmenu';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SiteSponsorsComponent],
  imports: [
    CommonModule,
    SiteSponsorsRoutingModule,
    FormsModule,
    ButtonModule,
    PanelMenuModule,
    SelectButtonModule,
    RadioButtonModule,
    BreadcrumbModule,
    ToastModule,
    DialogModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FileUploadModule,
    ToolbarModule,
    TabViewModule,
    TableModule,
    PanelModule,
    CheckboxModule,
    InputTextModule,
  ]
})
export class SiteSponsorsModule { }
