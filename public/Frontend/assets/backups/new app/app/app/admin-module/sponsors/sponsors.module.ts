import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsRoutingModule } from './sponsors-routing.module';
import { SponsorsComponent } from './sponsors.component';
import { ManageComponent } from './manage/manage.component';
import { AdsComponent } from './ads/ads.component';

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
import { FormsModule } from '@angular/forms';
import { FullInfoComponent } from './full-info/full-info.component';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { SingleAdComponent } from './single-ad/single-ad.component';

@NgModule({
  declarations: [SponsorsComponent, ManageComponent, AdsComponent, FullInfoComponent, SingleAdComponent],
  imports: [
    CommonModule,
    SponsorsRoutingModule,
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
    PipeModuleModule
  ]
})
export class SponsorsModule { }
