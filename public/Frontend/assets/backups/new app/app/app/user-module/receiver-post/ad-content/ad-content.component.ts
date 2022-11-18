import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AdPostService } from 'src/app/services/ad-post.service';
import { Ad } from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface AdContent {
  adTitle : string,
  firstName : string,
  description : string,
  gender : string,
  tagline : string,
  age : number | string 
}

@Component({
  selector: 'app-ad-content',
  templateUrl: './ad-content.component.html',
  styleUrls: ['./ad-content.component.css']
})
export class AdContentComponent implements OnInit, AfterViewInit, OnDestroy {
  submitting: boolean = false;
  adContent : AdContent; //current tab details;
  ad: Ad; //global ad details (saved);
  saved : boolean = false;
  unsub$ = new Subject();
  constructor(private ren : Renderer2, private ps: AdPostService, private router: Router, private loader: LoaderService) { 
    this.adContent = {
      adTitle : "",
      firstName : "",
      description : "",
      gender : "",
      tagline : "",
      age : ""
    }
  }

  ngOnInit(): void {
    this.ps.newPage(3);
    this.ps.AdObservable().pipe(takeUntil(this.unsub$)).subscribe((ad: Ad)=>{
      this.ad = ad;
      if(!this.ad._id){
        this.ps.newMessage('info', 'Ad Not Initialized', 'Please start an ad by selecting category');
        this.router.navigate(['/receiver/post/select-category']);
      }
      //if already saved to server autofill from global ad data else use autofill from local draft of content
      this.adContent.adTitle = ad.adTitle? ad.adTitle : "";
      this.adContent.firstName = ad.firstName? ad.firstName : "";
      this.adContent.age = ad.age? ad.age : "";
      this.adContent.description = ad.description? ad.description : "";
      this.adContent.gender = ad.gender? ad.gender : "";
      this.adContent.tagline = ad.tagline? ad.tagline : "";
      //if all data present then it's already saved so saved = true.
      if(ad.adTitle && ad.gender && ad.description && ad.firstName && ad.age)
        this.saved = true;
    });
  }

  ngAfterViewInit() : void{
      const spans = <HTMLElement><any>document.getElementsByClassName('ql-formats');
      const parent = this.ren.parentNode(spans[0]);
      this.ren.removeChild(parent, spans[0]);
      this.ren.removeChild(parent, spans[2]);
      this.ren.removeChild(parent, spans[4]);
  }

  save_ad_content() : Promise<boolean> {
     return new Promise((res, rej)=>{

       //check if ad is initialized or not.
       if(!this.ad._id){
         this.ps.newMessage('error', 'Ad Not Initialized', 'please initialize the ad first');
         this.router.navigate(['/receiver/post/select-category']);
         return rej(false);
       }
       if(!this.verifyForm())
         return rej(false);

        console.log(76);
       //save to server.
       this.ps.save_ad_content(this.adContent).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
         if(response.status){
           this.ps.newMessage('success', 'Ad Content Saved', 'The content was saved!');
           this.ps.NewAdData(response.data);
           this.stopload();
           return res(true);
         } else {
           console.log(response);
           this.ps.newMessage('error', 'Content Save Failed', response.message);
         }
         return rej(false);
       }, (error)=>{
         if(error instanceof ErrorEvent)
           this.ps.newMessage('error', 'Error occured', 'sorry couldn\'t connect to the URL');
         else 
           this.ps.newMessage('error', 'Error occured', error.error.message);
         return rej(false);
       })
     })
  }

  prevPage(){ 
    //check is data is saved to server.
    // if(!this.saved){
    //   //checks if any changes are made after saved to server.
    //   if(this.checkUnsavedChanges()){
    //     this.handleUnsavedChanges().then(()=>{
    //       this.router.navigate(['/receiver/post/select-location']);
    //     });
    //   }
   // } else {
       //implement local draft saving.
       this.router.navigate(['/receiver/post/select-location']);
    //}
  }

  nextPage(form){
    //check is data is saved.
    if(form.status == 'INVALID')
       return this.ps.newMessage('error', 'Invalid Input', 'Please fill the form with valid inputs');
    this.load();
    if(this.saved){
      //checks if any changes are made after save.
      if(this.checkUnsavedChanges()){
        this.handleUnsavedChanges().then(()=>{
          console.log(122);
          this.stopload();
          this.router.navigate(['/receiver/post/upload-images']);
        }).catch(()=>this.stopload());
      } else {
        this.stopload();
        this.router.navigate(['/receiver/post/upload-images']);
      }
    } else {
      //save and move to next page.
      this.save_ad_content().then(()=>{
        this.stopload();
        console.log(130);
        this.router.navigate(['/receiver/post/upload-images']);
      }).catch(()=>{
        console.log(132);
        this.stopload();
        console.log("something wrong");
      })
    }
  }

  checkUnsavedChanges() : boolean{
    //matches local content to global ad content to check for changes made.
    console.log(143)
    if(this.ad.firstName != this.adContent.firstName || this.ad.description != this.adContent.description || this.ad.gender != this.adContent.gender || this.ad.adTitle != this.adContent.adTitle || this.ad.tagline != this.adContent.tagline)
      return true;
    return false; 
  }

  handleUnsavedChanges(): Promise<boolean> {
    //confirm discard or save changes made after saving to server.
    return new Promise((res, rej)=>{
      this.ps.newMessage('warning', 'Unsaved Changes', 'you have unsaved changes');
      //implement confirmation.
      res(true);
    });
  }

  verifyForm(): boolean{
    for(let key in this.adContent){
      console.log(this.adContent[key]);
      if(this.adContent[key] == ""){
        this.ps.newMessage('info', 'Invalid Form', 'Please fill all the fields');
        return false;
      }
    }

    return true
  }


  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }

  ngOnDestroy() : void {
    this.unsub$.next(true);
    this.unsub$.complete();
  }

}
