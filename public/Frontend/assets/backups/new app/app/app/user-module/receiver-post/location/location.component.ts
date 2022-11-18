import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';
import { AdPostService } from '../../../services/ad-post.service';
import { Ad } from 'src/app/services/dataModels';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {
  submitting : boolean = false; //when submitting;
  loading: boolean = true //when loading;
  selectedCountry; //countryId
  selectedState;   //stateName
  selectedCity;    //cityName
  selectedCountryName; //countryName
  showState:boolean = false;
  showCity : boolean = false;
  cities : any[];
  states : any[];
  countries : any[];
  ad : Ad;
  saved: boolean = false;
  unsub$ = new Subject();
  constructor(private ds: UserDataService, private ps: AdPostService, private router: Router, private loader: LoaderService) { 
      this.cities = [];
      this.states = [];
      this.countries = [];
      this.selectedCountry = ""
      this.selectedState = ""
      this.selectedCity = ""
  }

  ngOnInit(): void {
    this.ps.newPage(2);
    this.ps.AdObservable().subscribe((ad: Ad)=>{
      this.ad = ad;
      if(!this.ad._id){
        this.ps.newMessage('info', 'Ad Not Initialized', 'Please initialize the ad first by selecting category');
        this.router.navigate(['/receiver/post/select-category']);
      }
    });

    this.get_country().then(()=>{
      //preset all selectors if the ad already has country, state and city;
      const unsubscribe$ = this.ps.AdObservable().pipe(takeUntil(this.unsub$)).subscribe((ad: Ad)=>{
        if(ad.country){
           //searches for matching country data using countryName from contries array;
           const countryDetails = this.countries.find((country)=> {
             return ad.country == country.countryName;
           });
           this.selectedCountry = countryDetails? countryDetails._id : "";
           this.selectedCountryName  = countryDetails? countryDetails.countryName : "";
           //extracts states field from selected country data;
           this.states = countryDetails? countryDetails.states : []; 
           if(ad.state){
             this.selectedState = ad.state;
             //if state is present fetch cities from server or cache;
             this.change_state({}).then(()=>{
               if(this.ad.city){
                 this.selectedCity = ad.city;
                 this.saved = true;
                }
             });
           } 
        }
      });
    });
  }

  get_country(): Promise<boolean>{
    //fetches countries from server which also contains country wise states.
    return new Promise((res, rej)=>{
      this.loading = true;
      this.ds.get_countries().pipe(takeUntil(this.unsub$)).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.countries = response.data;
          return res(true);
        } else {
          this.ps.newMessage('error', 'Country Fetch Failed', response.message);
        } 
        return rej(false);
      }, (error)=>{
        if(error instanceof ErrorEvent) 
          this.ps.newMessage('error', 'Failed', 'couldn\'t connect to the url');
        else 
          this.ps.newMessage('error', 'Failed', `${error.status}: ${error.error.message}`);
        this.loading = false;
        return rej(false);
      })
    })
  };

  change_country(event){
      //finds data of the selected country from countries array and extracts states.
      const country = this.countries.find((country)=>{
        if(country._id == this.selectedCountry)
          return true;
        else 
          return false;
      });
      this.states = country.states;
      this.showCity = false;
      this.selectedCountryName = country.countryName;
      this.selectedState = null;
      this.saved = false;
  };

  change_state(event): Promise<boolean>{
     //fetches city from server or cache using selectedState
     this.saved = false;
     this.loading = true;
     return new Promise((res, rej)=>{
        this.ds.get_cities(this.selectedCountry, this.selectedState).pipe(takeUntil(this.unsub$)).subscribe((response:any)=>{
          this.loading = false;
          this.showCity = true;
          if(response.status){
            this.cities = response.data[0].cities;
            //implement caching for cities.
            return res(true);
          } else {
            console.log(response);
            this.ps.newMessage('error', 'Cities Fetch Failed', response.message);
          }
          return rej(false);
        }, (error)=>{
          if(error instanceof ErrorEvent) 
            this.ps.newMessage('error', 'Failed', 'couldn\'t connect to the url');
          else 
            this.ps.newMessage('error', 'Failed', `${error.status}: ${error.error.message}`);
          this.loading = false;   
          return rej(false);
        })
     })
  };

  change_city(event){
     //implement if needed.
     this.saved = false;
  };

  save_location(){
    if(this.emptySelect())
      return;
    this.load();
    this.ps.selectLocation(this.selectedCountryName, this.selectedState, this.selectedCity).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
      if(response.status){
        this.ps.NewAdData(response.data);
        this.ps.newMessage('success', 'Location Saved', 'Ad location was saved');
        this.saved = true;
        this.stopload();
        return this.nextPage();
      } else {
        this.ps.newMessage('error', 'Failed Save', 'Couldn\'t save the location');
      }
      this.stopload();
    }, (error)=>{
      if(error instanceof ErrorEvent) 
        this.ps.newMessage('error', 'Failed', 'couldn\'t connect to the url');
      else 
        this.ps.newMessage('error', 'Failed', `${error.status}: ${error.error.message}`);   
      this.stopload();
    })
  }

  prevPage(){
    //implement confirmation
    if(!this.unsavedChanges())
      this.router.navigate(['/receiver/post/select-category']);
  }
  nextPage(){ 
     if(this.saved && !this.unsavedChanges())
       this.router.navigate(['/receiver/post/ad-content']);
     else 
       this.save_location();
  }

  emptySelect(): boolean{
    //checks if all the values are present 
    if(this.selectedCountry == "")
      this.ps.newMessage('info', 'Country Not Selected', 'please Select a country');
    else if(this.selectedState == "")
      this.ps.newMessage('info', 'State Not Selected', 'Please select a state');
    else if(this.selectedCity == "")
      this.ps.newMessage('info', 'City Not Selected', 'Please select a city');
    else 
      return false;

    return true; 
  }

  unsavedChanges(){
    console.log("check unsaved" + this.saved);
    if(this.saved == true){
     if(this.ad.country || this.ad.state || this.ad.city){
      if(this.ad.country != this.selectedCountryName || this.ad.state != this.selectedState || this.ad.city != this.selectedCity){
        this.ps.newMessage('warning', 'Unsaved Changes', 'You have unsaved changes, discard them?');
         //implement confirmation toast (save or stash)
        return true;
      } else 
         return false;
     }
    }
    return false;
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
    this.unsub$.next(true);
    this.unsub$.complete();
  }
}
