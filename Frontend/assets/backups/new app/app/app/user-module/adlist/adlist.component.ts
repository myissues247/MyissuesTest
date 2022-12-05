import { Component, OnDestroy, OnInit, Renderer2, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdPostService } from 'src/app/services/ad-post.service';
import { StateService, UserSession } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit, OnDestroy {
  submitting : boolean = false;
  unsubscribe$;
  query : any;
  ads : any[];
  session : UserSession;
  constructor(private ps: AdPostService, private ss: StateService, private router: Router, private ds: UserDataService, private ren : Renderer2, private ar : ActivatedRoute, private loader: LoaderService) { 
    this.query = {
      skip: 0,
      adType : 'published'
    }
    this.unsubscribe$  = new Subject()
  }

  ngOnInit(): void {
    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsubscribe$)).subscribe((session)=>{
       this.session = session;
       this.get_ads();
    });
  }

  ngOnDestroy() : void {
     this.unsubscribe$.next();
     this.unsubscribe$.complete();
  }
  
  get_ads(): void {
    this.load();
    this.query.owner = this.session.type;
    this.ds.get_user_ads(this.query).pipe(takeUntil(this.unsubscribe$)).subscribe((response)=>{
      this.stopload();
      if(response.status) {
        this.ads = response.data;
        console.log(this.ads);
      } else {
        console.log(response);
        alert(response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
        alert('sorry some unknow error occured');
      else 
        alert(error.error.message);
    })
  }

  view_ad(adId) {
    this.router.navigate(['/ads/full'], {queryParams: {ad: adId}});
  }

  edit_ad(adId) {
    if(this.session.type == 'agency' || this.session.type == 'sponsor') 
       return this.router.navigate(['post/select-location'], {queryParams: {action: 'edit', adId: adId}, relativeTo: this.ar});
    this.router.navigate(['post/select-category'], {queryParams: {action: 'edit', adId: adId}, relativeTo: this.ar});
  }
  
  show_dialog(event) {
    this.ren.addClass(this.ren.nextSibling(event.target), 'show-dialog');
  }

  close_dialog(event) {
    const parent1 = this.ren.parentNode(event.currentTarget);
    const parent2 = this.ren.parentNode(parent1);
    this.ren.removeClass(parent2, 'show-dialog');
  }

  delete_ad(adId, i) {
    this.load();
    this.ps.delete(adId).pipe(takeUntil(this.unsubscribe$)).subscribe((response)=>{
      this.stopload();
      if(response.status) {
        this.ds.newMessage('success', 'Ad Deleted', 'the ad was deleted');
        //delete from local array.
        if(this.ads[i]._id == adId)
          this.ads.splice(i, 1);
        else 
          this.ads.filter(ad => ad._id != adId);
      } else {
        console.log(response);
        this.ds.newMessage('error', 'Couldn\'t Delete Ad', response.message);
      }
    }, this.ErrorHandle.bind(this));
  }

  copy_ad(adId) {
    const owner = this.session.type;
    this.load();
    this.ps.copy_ad(adId, owner).pipe(takeUntil(this.unsubscribe$)).subscribe((response)=>{
      this.stopload();
      if(response.status){ 
        this.ps.NewAdData(response.data);
        this.ds.newMessage('success', 'Ad Copied As Draft', response.message);
        //this.router.navigate(['post/select-category'], {queryParams : {action: 'copy', adId:adId}, relativeTo: this.ar});
      } else {
        console.log(response);
        this.ds.newMessage('error', 'Couldn\'t Copy Ad', response.message);
      }
    }, this.ErrorHandle.bind(this))
  }
  
  bumpAd(adId) {
    this.load();
    this.ds.bumpAd(adId).pipe(takeUntil(this.unsubscribe$)).subscribe((response)=>{
      this.stopload()
      if(response.status) {
        this.ds.newMessage('success', 'Ad Bumped', response.message);
        this.ss.bumpsAdd(response.data.bumpsLeft);
      } else {
        this.ds.newMessage('error', 'Couldn\'t Bump Ad', response.message);
        console.log(response);
      }
    }, this.ErrorHandle.bind(this));
  }

  upgrade_plan(adId) {
     //this.router.navigate(['post/upgrades'], {queryParams: {adId : adId}, relativeTo: this.ar});
     if(this.session.type == 'agency')
        this.router.navigate(['/agency/bumps/purchase-bumps']);
     if(this.session.type == 'sponsor')
        this.router.navigate(['/sponsor/bumps/purchase-bumps']);
     else 
        this.router.navigate(['/bumps/purchase-bumps']);
  }
  

   buyBumps() {
     if(this.session.type == 'agency')
       this.router.navigate(['/agency/bumps/purchase-bumps']);
     else if(this.session.type == 'sponsor')
       this.router.navigate(['/sponsor/bumps/purchase-bumps']);
     else 
       this.router.navigate(['/receiver/bumps/purchase-bumps']);
   }

  ad_status(adId, status, i) {
    const owner = this.session.type;
    this.load();
    this.ps.ad_status(adId, status, owner).pipe(takeUntil(this.unsubscribe$)).subscribe((response)=>{
      this.stopload();
      if(response.status) {
        alert(response.message);
        if(this.ads[i]._id == adId) 
          this.ads[i].status = status;
        else 
          this.ads.map(ad => {
            if(ad._id == adId)
              ad.status = status
          })
      } else {
        console.log(response);
        alert(response.message);
      }
    }, this.ErrorHandle.bind(this));
  }

  ErrorHandle(error) {
    if(error instanceof ErrorEvent) 
    this.ds.newMessage('error', 'Error Occured', 'sorry some unknow error occured');
    else 
    this.ds.newMessage('error', 'Error', error.status + " : " + error.error.message);
    this.stopload()
  }

  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }
}
