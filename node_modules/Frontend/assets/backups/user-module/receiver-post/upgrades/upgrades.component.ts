import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdPostService } from 'src/app/services/ad-post.service';
import { Ad, Bumps } from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.component.html',
  styleUrls: ['./upgrades.component.css']
})
export class UpgradesComponent implements OnInit, OnDestroy {
  @ViewChild('paymentOption') 
    paymentOptionModal;
  @ViewChild('optionClose')
    closeModal; 
  
  unsub$ = new Subject();
  submitting: boolean = false;
  ad: Ad;
  adPlans: any[];
  showPlan = false;
  bumps: Bumps[];
  selectedBump=null;
  balance;
  showConfirm; //confirm balance payment;
  showBumps=false;
  plan : any;
  planId : string; // selected planId
  categoryId : string // selected CategoryId
  FlagPlanAdded: boolean = false;// keeps track of plan, if added or not.
  FlagPlanChanged: boolean = false; // if the selected plan is Changed.
  FlagPlanPaid : boolean = false;  //if user has already paid for the plan (published);
  constructor(private router:Router, private ps: AdPostService, private ss: StateService, private ds: UserDataService, private ar: ActivatedRoute, private loader: LoaderService) { }

  ngOnInit(): void {
    this.ps.newPage(6);
    // get ad data saved in global service.
    this.ps.AdObservable().pipe(takeUntil(this.unsub$)).subscribe((ad: Ad)=>{
       this.ad = ad;
       // checking if ad data is saved in global service, if not present we check the url params for ad id to fetche it from server.
       if(!this.ad._id){
          this.checkParamForAdId();
       }

    // check if plan already selected (in published ad while editing).
    if(ad.advertisePlanCheck && ad.advertisePlan instanceof Object && ad.advertisePlan.adPlanId && ad.advertisePlan.adPlanCategory) 
          this.fillPrePurchasedPlan(ad);
       else 
          this.checkIfAdPlanSelected();
    });

    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      this.balance = session.balance
    });

    this.getAdPlan();
  }

  checkParamForAdId() {
      // checks if ad id is present in url param so that it can fetch data from server.
      this.ar.queryParams.pipe(takeUntil(this.unsub$)).subscribe((params)=>{ 
        if(params.adId)
           return this.getAdData(params.adId);
      
        // else return to the category select.
        this.ps.newMessage('info', 'Ad Not Initialized', 'Please initialize the ad first by selecting category');
        this.router.navigate(['/receiver/post/select-category']);
       });
  }

  fillPrePurchasedPlan(ad) {
    // fill the necessary data if plan is already purchased.
    this.planId = ad.advertisePlan.adPlanId;
    this.categoryId = ad.advertisePlan.pipe(takeUntil(this.unsub$)).adPlanCategory;
    this.FlagPlanAdded = true;
    this.showPlan = true;
  
    // check if user has already paid for the plan.
    if(ad.advertisePlan.paid)
      this.FlagPlanPaid = true;
  }
  
  
  checkIfAdPlanSelected() {
    // check if any new ad plan is selected (in new plan)
    this.ps.adPlanTakenObservable().pipe(takeUntil(this.unsub$)).subscribe((plan)=>{
      delete this.plan; 
      this.plan = plan;
      if(plan.adPlanId && plan._id) {
        this.planId = plan.planId;
        this.categoryId = plan._id;
        this.FlagPlanChanged = true;
      }
    });
  }

  
  getAdData(adId : string) {
    // gets ad data from server if ad data is not present in cache.
    this.ps.get_ad(adId).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      if(response.status) {
        this.ps.NewAdData(response.data);
      } else {
        this.ps.newMessage('error', 'No Data', response.message);
      }
    }, this.errorHandle.bind(this));
  }
  

  getAdPlan(){
    // get ad and bump plans from server.
    this.ps.get_ad_plans().pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      if(response.status){
        this.adPlans = response.data.adPlans;
        this.bumps = response.data.bumps;
        console.log(response.data);
      } else {
        console.log(response);
        this.ps.newMessage('error', 'No Plan Found', response.message);
      }
    }, this.errorHandle.bind(this))
  }
  

  select_plan(planId, category) {
    // check if plan is not already selected.
    if(planId != this.planId || category._id != this.categoryId) {
      this.planId = planId;
      this.categoryId = category._id;

      this.plan = {
        planId : planId,
        ...category
      }
      // plan is changed so flag is true;
      this.FlagPlanChanged = true;
    }
  }


  buyBumps() {
    this.ps.lock = true;
    const bump = this.selectedBump;
    this.router.navigate(['/receiver/bumps/pay-with-card'], {queryParams: {bumpId: bump._id, price: bump.price, count: bump.count, back: '/receiver/post/upgrades', adId: this.ad._id}});
  }


  save_plan() {
   return new Promise((res, rej)=>{
      // if plan is added and not changed then move forward without save.
      if(this.FlagPlanAdded && !this.FlagPlanChanged){
        return res(true);
      }
      // if user has purchased a plan already (upgrade after publishing) then ask for confirmation.
      else if(this.FlagPlanAdded && this.FlagPlanPaid) {
        const confirm = window.confirm('you have already purchased a plan, upgrading will cost you extra');
        if(!confirm) {
           this.planId = this.ad.advertisePlan.adPlanId;
           this.categoryId = this.ad.advertisePlan.adPlanCategory;
           return res(false);
        }
      }
      // save new plan to cache so it can be used while checkout.
      this.ps.newPlanTake(this.plan);
      return res(true);
    })
  }
  
  upgrade() {
    this.showPlan=true;
  }

  cancelPlan() {
    this.showPlan=false;
    this.plan = null;
    this.ps.newPlanTake({});
  }

  nextPage() {
    /* TODO : implement changes and unsaved data detection. */
    this.load();
     this.save_plan().then(()=>{ 
       this.stopload();
       this.router.navigate(['/receiver/post/finalize']);
     }).catch(()=>{
       this.stopload();
     });
  }

  prevPage() {
    //TODO : implement local cache for unsaved data;
    this.router.navigate(['/receiver/post/user-details']);
  }
  

  errorHandle(error) {
    if(error instanceof ErrorEvent)
      this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
    else 
      this.ps.newMessage('error', 'Error Occured', error.status + ":" + error.error.message);
  }

  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }

  ngOnDestroy() : any {
    this.unsub$.next(true);
    this.unsub$.complete();
    this.closeModal.nativeElement.click()
  }


  
  showPaymentOptions(bump) {
    this.selectedBump = bump;
    this.paymentOptionModal.nativeElement.click()
  }
  

  buyBumpWithBalance() {
    this.ds.purchase_bump_up_with_bal({bumpId: this.selectedBump._id}).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
       if(response.status) {
         alert('Purchased ' + this.selectedBump.count + " bumps");
         this.ss.bumpsAdd(response.data.totalBumps);
         this.closeModal.nativeElement.click()
       } else {
         this.ds.newMessage('error', 'Failed', response.message);
       }
    }, this.errorHandle.bind(this));
  }

  close_modal() : void {
    this.closeModal.nativeElement.click();
    this.showConfirm = false;
    this.selectedBump = null;
  }


}