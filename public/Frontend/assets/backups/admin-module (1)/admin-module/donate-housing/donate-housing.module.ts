import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateHousingRoutingModule } from './donate-housing-routing.module';
import { DonateHousingComponent } from './donate-housing.component';
import { AllComponent } from './all/all.component';

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
import { SingleComponent } from './single/single.component';

@NgModule({
  declarations: [DonateHousingComponent, AllComponent, SingleComponent],
  imports: [
    CommonModule,
    DonateHousingRoutingModule,
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
    PipeModuleModule
  ]
})
export class DonateHousingModule { }
