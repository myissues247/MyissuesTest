import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { AgencyManageComponent } from './agency-manage/agency-manage.component';

import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import { AgencyAdsComponent } from './agency-ads/agency-ads.component';
import { SingleAdComponent } from './single-ad/single-ad.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { FullInfoComponent } from './full-info/full-info.component';
import { AddAgencyComponent } from './add-agency/add-agency.component'
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
@NgModule({
  declarations: [AgencyComponent, AgencyManageComponent, AgencyAdsComponent, SingleAdComponent, FullInfoComponent, AddAgencyComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    BreadcrumbModule,
    EditorModule,
    DialogModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    ToastModule,
    SelectButtonModule,
    AgencyRoutingModule,
    PipeModuleModule,
    FormsModule,
    InputMaskModule,
    CalendarModule,
  ]
})
export class AgencyModule { }
