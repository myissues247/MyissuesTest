import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { ViewComponent } from './view/view.component';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';

import { FormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
// import { SingleComponent } from './single/single.component';
import { MapComponent } from './map/map.component';
import {DialogModule} from 'primeng/dialog';
import { View2Component } from './view2/view2.component';
import { DataViewModule} from 'primeng/dataview';
import { AccordionModule } from 'primeng/accordion';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';
import { UsernavbarModule } from 'src/app/user-module/usernavbar/usernavbar.module';
import { UserheaderModule } from 'src/app/user-module/userheader/userheader.module';
import { UserfooterModule } from 'src/app/user-module/userfooter/userfooter.module';
import { HeaderModule } from '../header/header.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [AdsComponent, ViewComponent, MapComponent, View2Component],
  imports: [  
    CommonModule,
    AdsRoutingModule,   
    ButtonModule,
    DropdownModule,
    PaginatorModule,
    FormsModule,
    SidebarModule,
    DialogModule,
    DataViewModule,
    AccordionModule,
    PipeModuleModule,
    UsernavbarModule,
    UserheaderModule,
    UserfooterModule,
    HeaderModule,
    NavbarModule
  ]
}) 
export class AdsModule { } 
 