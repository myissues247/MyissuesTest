import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiverPostRoutingModule } from './receiver-post-routing.module';
import { ReceiverPostComponent } from './receiver-post.component';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { RouterModule } from '@angular/router';
import {StepsModule} from 'primeng/steps';
import { ToastModule } from 'primeng/toast'; 
import {MessageModule} from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LocationComponent } from './location/location.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { AdContentComponent } from './ad-content/ad-content.component';
import {InputTextModule} from 'primeng/inputtext';
import {EditorModule} from 'primeng/editor';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PhotosComponent } from './photos/photos.component';
import {FileUploadModule} from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { UpgradesComponent } from './upgrades/upgrades.component';
import {  UsernavbarModule } from '../usernavbar/usernavbar.module';
import { UserheaderModule  } from '../userheader/userheader.module';
import { FinalizeComponent } from './finalize/finalize.component';
import { UserfooterModule } from '../userfooter/userfooter.module';
import { PipeModuleModule } from 'src/app/pipe-module/pipe-module.module';


@NgModule({
  declarations: [ReceiverPostComponent, SelectCategoryComponent, LocationComponent, AdContentComponent, UserDetailsComponent, PhotosComponent, UpgradesComponent, FinalizeComponent],
  imports: [
    CommonModule,  
    ReceiverPostRoutingModule, 
    RouterModule, 
    StepsModule, 
    ToastModule, 
    MessageModule,
    CardModule,
    ButtonModule,  
    DropdownModule,
    FormsModule,  
    InputTextModule,
    EditorModule,
    FileUploadModule,
    TabViewModule,
    InputMaskModule,
    CalendarModule,
    UsernavbarModule,
    UserheaderModule,
    UserfooterModule,
    PipeModuleModule
  ]
})
export class ReceiverPostModule { }
