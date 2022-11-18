import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LoaderService } from './services/loader.service';
import {MessageService} from 'primeng/api';
import { UserDataService } from './services/user-data.service';
import { NotificationService } from './services/notification.service';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService] 
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'homePage';
  starting = true;
  progress : boolean;
  @ViewChild("modalButton")
    modalButton;
  @ViewChild('progressBar')
  progressBar : ElementRef;

  progressMessage: String;
  
  selectedNotif = null;
  constructor(  private ms : MessageService, private ds: UserDataService ,private router: Router, private ren: Renderer2, private loaderService : LoaderService, private notification: NotificationService, private layout: LayoutService) {
    this.router.events.subscribe((event : RouterEvent)=>{
      if(event instanceof NavigationStart){
        this.progress  = true;
        setTimeout(() => {
          this.ren.setStyle(this.progressBar.nativeElement,'width', "70%");
        }, 10);
      }
      else if(event instanceof NavigationError || event instanceof NavigationCancel || event instanceof NavigationEnd){
        if(this.starting) this.starting = false;
        this.ren.setStyle(this.progressBar.nativeElement,'width', "100%");  
        setTimeout(() => {
          this.progress = false;
          this.ren.setStyle(this.progressBar.nativeElement, 'width', '0%');
        }, 0);
      }
    });
  }

  ngOnInit() : any {
    this.ds.getsiteSetting().subscribe((response: any)=>{
      if(response.status) {
        this.layout.newSiteSetting(response.data);
      } else {
        this.ms.add({severity: "error", summary: "Couldn\'t Fetch layout", detail: response.message})
      }
    }, (error)=>{ 
      if(error instanceof ErrorEvent) 
      this.ms.add({severity: "error", summary: "Error Occured", detail: "Sorry some unknown error occured on the client"});
      else 
      this.ms.add({severity: "error", summary: "Couldn\'t Fetch layout", detail: error.error.message})
    })
  }

  ngAfterViewInit(): any {
    this.ds.messageObserver().subscribe((response)=>{
      this.ms.add(response);
    });
    
    this.notification.notification$.asObservable().subscribe((notification)=>{
       this.selectedNotif = notification;
       this.modalButton.nativeElement.click();
    })

    this.loaderService.loader().subscribe((state)=>{
      if(state.state == true) {
         this.progress = true;
         // If message is passed...
         if(state.message) 
           this.progressMessage = state.message;

         setTimeout(()=>{
           this.ren.setStyle(this.progressBar.nativeElement, 'width', state.amount)
         }, 10);
      } else {
        this.ren.setStyle(this.progressBar.nativeElement, 'width', '100%');
        setTimeout(()=>{
          this.progress = false; 
          this.ren.setStyle(this.progressBar.nativeElement, 'width', '0%');
        }, 10);
      }
    })
  }
   
  goToAd(id) {
    this.router.navigate(['/ads/full'], {queryParams: {ad: id}})
  }


}
