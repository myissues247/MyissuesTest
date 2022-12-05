import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReceiverAdsRoutingModule } from './receiver-ads-routing.module';
import { ReceiverAdsComponent } from './receiver-ads.component';
import { AllAdsComponent } from './all-ads/all-ads.component';
import { ReceiverManageComponent } from './receiver-manage/receiver-manage.component';
import { SingleAdComponent } from './single-ad/single-ad.component';

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
import { SingleComponent } from './single/single.component';



@NgModule({
  declarations: [ReceiverAdsComponent, AllAdsComponent, SingleAdComponent
  ,ReceiverManageComponent, SingleComponent],
  imports: [
    CommonModule,
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
    ReceiverAdsRoutingModule, 
    PipeModuleModule
  ]
})
export class ReceiverAdsModule { }
