import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AdminModuleComponent } from './admin-module.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BannerComponent } from './banner/banner.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { WithdrawRequestComponent } from './withdraw-request/withdraw-request.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DonnerManageComponent } from './donner-manage/donner-manage.component';
import { ReceiverManageComponent } from './receiver-manage/receiver-manage.component';
import { AgencyManageComponent } from './agency-manage/agency-manage.component';
import { CompanyManageComponent } from './company-manage/company-manage.component';
import { DonateHouseComponent } from './donate-house/donate-house.component';
import { CommentsManageComponent } from './comments-manage/comments-manage.component';
import { SponsorManageComponent } from './sponsor-manage/sponsor-manage.component';
import { ProvinceManageComponent } from './province-manage/province-manage.component';
import { RegionManageComponent } from './region-manage/region-manage.component';
import { CityManageComponent } from './city-manage/city-manage.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { BumpComponent } from './bump/bump.component';
import { BumpOnHourComponent } from './bump-on-hour/bump-on-hour.component';
import { AdvertiseManageComponent } from './advertise-manage/advertise-manage.component';
import { SubscriptionManageComponent } from './subscription-manage/subscription-manage.component';
import { VolunteerManageComponent } from './volunteer-manage/volunteer-manage.component';
import { DiscussionManageComponent } from './discussion-manage/discussion-manage.component';
import { SiteSettingComponent } from './site-setting/site-setting.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'; 

//Primeng Component
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';

import { StatuschangePipe } from './statuschange.pipe';
import { SanitizationPipe } from './sanitization.pipe';
import { AccessChangePipe } from './access-change.pipe';
import { ReceiverComponent } from './receiver/receiver.component';
import { AgencyCategoryComponent } from './agency-category/agency-category.component';
import { PipeModuleModule } from '../pipe-module/pipe-module.module';
import { DonorFullInfoComponent } from './donor-full-info/donor-full-info.component';
import { FullComponent } from './volunteer-manage/full/full.component';
import { DonorEditComponent } from './donor-edit/donor-edit.component';
import { Calendar, CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [AdminModuleComponent,
    AdminDashboardComponent,
    AdminNavComponent,
    SidebarComponent,
    BannerComponent,
    UserManageComponent,
    WithdrawRequestComponent,
    TransactionComponent,
    DonnerManageComponent,
    ReceiverManageComponent,
    AgencyManageComponent,
    CompanyManageComponent,
    DonateHouseComponent,
    CommentsManageComponent,
    SponsorManageComponent,
    ProvinceManageComponent,
    RegionManageComponent,
    CityManageComponent,
    CategoryManageComponent,
    BumpComponent,
    BumpOnHourComponent,
    AdvertiseManageComponent,
    SubscriptionManageComponent,
    VolunteerManageComponent,
    DiscussionManageComponent,
    SiteSettingComponent,
    AdminSettingComponent,
    AdminComponent,
    AdminSigninComponent,
    StatuschangePipe,
    SanitizationPipe,
    AccessChangePipe,
    ReceiverComponent,
    AgencyCategoryComponent,
    DonorFullInfoComponent,
    FullComponent,
    DonorEditComponent],

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    SidebarModule,
    PanelMenuModule,
    SelectButtonModule,
    RadioButtonModule,
    BreadcrumbModule,
    ToastModule,
    DialogModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DropdownModule,
    FileUploadModule,
    ToolbarModule,
    TabViewModule,
    TableModule,
    PanelModule,
    CheckboxModule,
    InputTextModule,
    AdminModuleRoutingModule, 
    PipeModuleModule,
    CalendarModule
  ]
})
export class AdminModuleModule { }
