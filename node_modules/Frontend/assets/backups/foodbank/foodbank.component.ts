import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewsInThisWeekComponent } from 'src/app/doner-module/stats/views-in-this-week/views-in-this-week.component';
import { BulkAd, DonationsService } from 'src/app/services/donations.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';

interface Query{
  stateName : string,
  cityName : string,
  category : string,
  skip: Number,
  withTotal:boolean,
  limit:Number
}


interface AdSmall{
  _id: string,
  receiverId : string,
  firstName? : string,
  agencyTitle? : string,
  ownerType : string,
  categoryName? : string,
  adTitle : string,
  description: string,
  city : string,
  age : number,
  householdMembers: {
    numChildren : number,
    numAdults : number,
    numSeniors : number
  },
  identityImages: string[],
  approvedOn : string,
  amount:number,
  advertisePlanCheck: boolean,
  boosted : boolean
}

@Component({
  selector: 'app-foodbank',
  templateUrl: './foodbank.component.html',
  styleUrls: ['./foodbank.component.css']
})
export class FoodbankComponent implements OnInit {
  unsub$;
  defaultImage = 'assets/images/no-image.jpg';
  ads : AdSmall[];
  submitting  = false;
  loading = false;
  query : Query;
  donationCart : BulkAd[] = [];
  totalToDonate : number = 0;
  openedAd: AdSmall = null;

  constructor(
    private ds: UserDataService, 
    private ss: StateService, 
    private router: Router, 
    private ar: ActivatedRoute,
    private donationService : DonationsService
  ) { 
    this.ads = [];
    this.query = {
      stateName: undefined,
      cityName : undefined,
      category : 'foodbank',
      skip : 0,
      limit:10,
      withTotal:false
    };
  
    this.unsub$ = new Subject();
  }


  ngOnInit(): void {
    this.get_ads(this.query, true);
  }

  
  get_ads(query, withTotal=false){
    this.spin();
    query.withTotal = withTotal;
    this.ds.get_ads(query).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      this.stopSpin();
      if(response.status){
        this.ads = response.data.ads;
        //this.totalRecords= response.data.total;
      } else {
        this.ds.newMessage('error', 'Fetch Ads Failed', response.message);
      }
    }, this.handle_error.bind(this))
  }


  ad_to_donation_cart(event, adId, price=80) {
    if(event.target.checked) {
      const getAd = this.ads.find((ad : AdSmall)=> ad._id === adId);
      if(!getAd) return this.ds.newMessage('error', 'Ad not available', 'Couldn\'t select ad for donation');
      const {_id, firstName, adTitle, receiverId} = getAd;
      this.donationCart.push({_id, name: firstName, adTitle, receiverId, amount: price});
      this.totalToDonate += price;
    } else {
      const getIndex = this.donationCart.findIndex((ad : BulkAd)=> ad._id === adId);
      this.donationCart.splice(getIndex, 1);
      this.totalToDonate -= price;
    }
  }


  open_ad(adIndex) {
    this.openedAd = {...this.ads[adIndex]};
  }
  

  donate_ads() {
    this.donationService.setBulkDonationAds(this.donationCart);
    const params = this.donationCart.map((ad)=>ad._id);
    this.router.navigate(['/donate/bulk/details'], {queryParams: {ads: params}});
  }

  donate_single() {
    const {_id, firstName, adTitle, receiverId, amount} = this.openedAd
    this.donationCart.push({
      _id, 
      name: firstName, 
      adTitle, 
      receiverId, 
      amount
    });
    
    this.donate_ads();
  }

  
  handle_error(error : HttpErrorResponse){
    if(error.error instanceof ErrorEvent)
      this.ds.newMessage("error", "Unknown Error Occured", error.message);
    else 
      this.ds.newMessage("error", "Action Failed", error.error?.message || error.message);
    this.stopSpin();
  }

 
  ngOnDestroy() : any {
    this.unsub$.next();
    this.unsub$.complete();
  }

  spin() {
    this.loading = true;
    this.submitting = true;
  }

  stopSpin() {
    this.loading = false;
    this.submitting =false;
  }
}
