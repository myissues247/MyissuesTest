import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ElementRef } from "@angular/core";

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
  city : string,
  age : number,
  adImages: string[],
  approvedOn : string,
  advertisePlanCheck: boolean,
  boosted : boolean
}

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit, OnDestroy {
  unsub$;
  defaultImage = 'assets/images/no-image.jpg';
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
  ads : AdSmall[];
  query : Query;
  display: boolean;    
  submitting  = false;
  loading = false;
  layout= 'list';
  totalRecords:number=0;
  first:Number=0;
  paramCategory : string;
  _selectedCategory : string;

  get selectedCategory() {
    return this._selectedCategory;
  }
  //move to view if the category is not foodbank as only foodbank ads are shown in this component.
  set selectedCategory(category) {
    if(category?.toLowerCase() == 'foodbank')
      this.router.navigate(['/ads/foodbank'])
    else 
      this._selectedCategory = category;
  }

  constructor(
    private ds: UserDataService, 
    private ss: StateService, 
    private router: Router, 
    private ar: ActivatedRoute,
    private el:ElementRef) {
      this.ads = [];
      this.query = {
        stateName: undefined,
        cityName : undefined,
        category : undefined,
        skip : 0,
        limit:10,
        withTotal:false
      };

      this.unsub$ = new Subject();
    }
  

  ngOnInit(): void {
    const category =  this.ar.snapshot.paramMap.get('category');
    const region = this.ar.snapshot.paramMap.get('region');
    this.selectedStateName = region;
    this.query.stateName = region;
    this.selectedCategory  = category;
    this.query.category = category;
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
        this.totalRecords= response.data.total;
      } else {
        this.ds.newMessage('error', 'Fetch Ads Failed', response.message);
      }
    }, this.handle_error.bind(this));
  }

  

  get_categories(){
    this.categories = this.ss.fromCache('categories');
    if(!this.categories){
      this.ds.GetLayout({}).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
        if(response.status){
          this.categories = response.data.categories;
          console.log(response);
          // this.ss.toCache('categories', this.categories);
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
    alert('hello');
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


  view_full(adId){
    this.router.navigate(['/ads/full'], {queryParams: {ad : adId}});
  }

  
  donate(adId){
    this.router.navigate(['/donate/details'], {queryParams: {adId: adId}});
  }

  
  handle_error(error){
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
  

  paginate(ev){
    this.query.skip=ev.first;
    this.get_ads(this.query)
  }

}
