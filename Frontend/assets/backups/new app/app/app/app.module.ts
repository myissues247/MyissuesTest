import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'; 
// import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {SidebarModule} from 'primeng/sidebar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { ValchangePipe } from './valchange.pipe';
import {PasswordModule} from 'primeng/password';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    ValchangePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    PanelModule,
    BreadcrumbModule,
    PasswordModule,
    AppRoutingModule,
    MessageModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
