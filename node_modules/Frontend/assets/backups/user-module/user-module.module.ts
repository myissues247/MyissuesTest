import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserModuleComponent } from './user-module.component';
import { FooterComponent } from './footer/footer.component';
// import { HeaderComponent } from './header/header.component';
// import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


// PrimeNG Componenet
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {ToolbarModule} from 'primeng/toolbar';
import {StepsModule} from 'primeng/steps';
import {CalendarModule} from 'primeng/calendar';
import {DataViewModule} from 'primeng/dataview';
import { FoodBankComponent } from './food-bank/food-bank.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
//import { AdpostComponent } from './adpost/adpost.component';
//import { AdlistComponent } from './adlist/adlist.component';
import {  UsernavbarModule } from './usernavbar/usernavbar.module';
import { UserheaderModule  } from './userheader/userheader.module';
import { UserfooterModule } from './userfooter/userfooter.module';
import { PipeModuleModule } from '../pipe-module/pipe-module.module';
import { HeaderModule } from './header/header.module';
import { NavbarModule } from './navbar/navbar.module';


@NgModule({
  declarations: [UserModuleComponent, FooterComponent,/*  HeaderComponent, NavbarComponent,*/ MainComponent, HomeComponent, FoodBankComponent, UserdetailComponent],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    PasswordModule,
    ToolbarModule,
    CalendarModule,
    DataViewModule,
    StepsModule,
    UsernavbarModule,
    UserheaderModule,
    UserfooterModule,
    PipeModuleModule,
    HeaderModule,
    NavbarModule
  ]
})
export class UserModuleModule { }
