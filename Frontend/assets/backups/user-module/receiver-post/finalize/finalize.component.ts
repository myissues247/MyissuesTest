import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdPostService } from 'src/app/services/ad-post.service';
import { Ad } from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService, UserSession } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {
  submitting: boolean = false;
  ad : Ad;
  plan : any;
  session : UserSession;
  unsub$ = new Subject();

  constructor(private router:Router, private ss: StateService, private ps: AdPostService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.ps.newPage(7);
    this.ps.AdObservable().pipe(takeUntil(this.unsub$)).subscribe((ad)=>{
      this.ad = ad;
      if(!this.ad._id) {
        alert('ad is not initialized');
        this.router.navigate(['/receiver/post/select-category'])
      }

        //checking if ad plan is taken.
      this.ps.adPlanTakenObservable().pipe(takeUntil(this.unsub$)).subscribe((plan)=>{
        if(plan) {
          this.plan = plan;
        }
      });
    });

    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      this.session = session;
    })
  }


  nextPage(){      
      //checks if plan is taken then handle upgrade if not then directly publish.
    if(this.plan instanceof Object && this.plan.planId && this.plan._id)
      this.handle_upgrade();
    else if(this.ad.adState == 'published'){
      this.ps.newMessage('success', 'Ad Saved', 'The ad was saved with all the changes');
    } 
    else 
      this.publish();
  }


  publish() {
      //publish if no payment is required.
    this.load();
    this.ps.publish_normal(this.ad._id).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      if(response.status) {
        alert(response.message);
        this.stopload();
        this.router.navigate(['/receiver']);
      } else {
        this.stopload();
        alert(response.message);
      }
    }, this.errorHandle.bind(this));
  }


  handle_upgrade() {
      //if card payment is needed.
    this.router.navigate(['/receiver/post/pay-via-card'], {queryParams: {action: 'upgrade'}});
  }


  prevPage(){
    /* TODO : implement local cache for unsaved data; */
    this.router.navigate(['/receiver/post/upgrades']);
  }

  errorHandle(error) {
    if(error instanceof ErrorEvent)
      this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
    else 
      this.ps.newMessage('error', 'Error Occured', error.status + ":" + error.error.message);
    this.stopload();
  }

  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }
  

  ngOnDestroy(): any{
    this.unsub$.next();
    this.unsub$.complete();
  }

}
