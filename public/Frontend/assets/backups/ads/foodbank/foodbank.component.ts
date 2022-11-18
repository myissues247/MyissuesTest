import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  sponsorTitle? : string,
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
  amountReceived: number,
  advertisePlanCheck: boolean,
  boosted : boolean
}

@Component({
  selector: 'app-foodbank',
  templateUrl: './foodbank.component.html',
  styleUrls: ['./foodbank.component.css']
})
export class FoodbankComponent implements OnInit, OnDestroy {
  @ViewChild('donateModalClose')
    donateModalCloseButton;
  unsub$;
  defaultImage = 'assets/images/no-image.jpg';
  ads : AdSmall[];
  submitting  = false;
  loading = false;
  query : Query;
  donationCart : BulkAd[] = [];
  totalToDonate : number = 0;
  openedAd: AdSmall = null;

  display;
  showRegion = false // to show/hide region dropdown;
  cities : any[] = [];
  states : any[] = [];
  countries : any[] = [];
  categories : any[] = [];
  selectedState : any;
  selectedCountry :any;
  selectedCountryId : string; 
  selectedStateName :string;
  selectedCityName : string;
  selectedCity: any;
  layout= 'list';
  totalRecords:number=0;
  amountEntered;

  _selectedCategory : string = 'foodbank';
  get selectedCategory() {
    return this._selectedCategory;
  }
  //move to view if the category is not foodbank as only foodbank ads are shown in this component.
  set selectedCategory(category) {
    if(category?.toLowerCase() != 'foodbank' && category != null)
      this.router.navigate(['/ads/view'], {queryParams: {category}})
    else 
      this._selectedCategory = category;
  }

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
    this.selectedCategory =  this.ar.snapshot.paramMap.get('category');
    this.get_ads(this.query, true);
    this.get_countries();
    this.get_categories();
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


  ad_to_donation_cart(event, adId) {
    if(event.target.checked) {
      const getAd = this.ads.find((ad : AdSmall)=> ad._id === adId);
      if(!getAd) 
        return this.ds.newMessage('error', 'Ad not available', 'Couldn\'t select ad for donation');

      const {_id, firstName, adTitle, receiverId, amount, amountReceived, identityImages} = getAd;
      //new amount required by ad if it has received partial donation earlier.
      const amountRequired = amount - amountReceived;
      this.donationCart.push({
        _id, 
        name: firstName, 
        adTitle, 
        receiverId,
        image: identityImages[0], 
        amountRequired: amountRequired, 
        //for multiple ads amount entered by donor is automatically set to amount required by ad
        amountEntered: amountRequired
      });
      this.totalToDonate += amountRequired;
    } else {
      const getIndex = this.donationCart.findIndex((ad : BulkAd)=> ad._id === adId);
      this.totalToDonate -= this.donationCart[getIndex].amountRequired;
      this.donationCart.splice(getIndex, 1);
    }
  }


  open_ad(adIndex) {
    this.openedAd = {...this.ads[adIndex]};
    this.increase_ad_view(this.openedAd._id);
    //preset amount input to the new amount required by ad if it has received partial donation earlier.
    this.amountEntered = (this.openedAd.amount - this.openedAd.amountReceived);
  }


  increase_ad_view(adId) {
    if (localStorage.getItem('viewed_' + adId)) return;
    this.ds.add_view(adId).subscribe((response)=>{
      localStorage.setItem('viewed_' + adId, "true");
      console.log(response);
    }, (error)=>{console.log(error)})
  }
  

  donate_ads(amountEntered=undefined) {
    this.donationService.setBulkDonationAds(this.donationCart);       
    const params = this.donationCart.map((ad)=>ad._id);
    this.router.navigate(['/donate/bulk/details'], {queryParams: {ads: params, amountEntered}});
  }


  donate_single() {
    if(isNaN(this.amountEntered))
      this.ds.newMessage('error', "Invalid Amount", "Please enter a valid amount");
    
    const {_id, firstName, adTitle, receiverId, amount, amountReceived, identityImages} = this.openedAd
    const requiredAmount = (amount - amountReceived);

    if( Number(this.amountEntered) <= 0 || this.amountEntered > requiredAmount)
      this.ds.newMessage('error', "Invalid Amount", "Please enter an amount between 0 and " + requiredAmount);

    this.donationCart.push({
      _id, 
      name: firstName, 
      adTitle, 
      receiverId,
      image: identityImages[0], 
      amountEntered : this.amountEntered, //donation amount will be entered by user
      amountRequired: requiredAmount, // new amount required for ad if any amount received earlier.
    });
    
    this.donate_ads(this.amountEntered);
  }


  get_categories(){
    this.categories = this.ss.fromCache('categories');
    if(!this.categories){
      this.ds.GetLayout({}).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
        if(response.status){
          this.categories = response.data.categories;
          this.ss.toCache('categories', this.categories);
        } else {
          this.ds.newMessage('error', 'Fetch Categories Failed', response.message);  
        }
      },  this.handle_error.bind(this))
    }
  }


  get_countries(){
    this.ds.get_countries().pipe(takeUntil(this.unsub$)).subscribe((response:any)=>{
      if(response.status){
        this.countries = response.data;
      } else {
        this.ds.newMessage('error', 'Fetch Countries Failed', response.message);
      }
    }, this.handle_error.bind(this));
  }


  change_country(event) {
    const countryId = event.value;
    this.selectedCountryId = event.value;
    const country = this.countries.filter((country)=>{
      if(country._id == countryId)
        return true;
      else 
        return false;
    });
    this.states = country[0].states;
  }


  change_state(countryId, stateName){
    stateName = stateName;
    this.selectedStateName =stateName;
    this.showRegion = false;
    this.ds.get_cities(countryId, stateName).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
      if(response.status){
        this.cities = response.data[0].cities;
      } else {
        this.ds.newMessage('error', 'Fetch States Failed', response.message);
      }
    }, this.handle_error.bind(this))
  }


  change_city(stateName, cityName){
    this.query.stateName = stateName;
    this.query.cityName = cityName; 
    this.get_ads(this.query, true);
  }


  change_category(categoryName){
    this.query.category= categoryName;
    this.selectedCategory = categoryName;
    this.get_ads(this.query, true); 
  }
 

  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      this.spin();
      this.ds.search_ads({searchItem: event.target.value}).subscribe((response)=>{
        if(response.status) {
          this.stopSpin();
          this.ads = response.data;
        } else {
          this.ds.newMessage("error", "Couldn\'t Fetch Ads", "Couldn't fetch data according to your search input");
        }
      }, this.handle_error.bind(this))
    }
  }


  apply(){
    this.display = false;
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
    this.donateModalCloseButton?.nativeElement?.click();
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
