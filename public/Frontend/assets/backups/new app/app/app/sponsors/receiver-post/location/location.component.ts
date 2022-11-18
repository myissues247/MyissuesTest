import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';
import { SponsorAdService } from '../../services/sponsor-ad.service';
import { Ad } from 'src/app/services/dataModels';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {
  submitting: boolean = false;
  loading: boolean = false;
  unsub$;
  selectedCountry; //countryId
  selectedState;   //stateName
  selectedCity;    //cityName
  selectedCountryName; //countryName
  showCity: boolean = false;
  cities : any[];
  states : any[];
  countries : any[];
  ad : Ad;
  saved: boolean = false;
  constructor(private ds: UserDataService, private ps:SponsorAdService, private router: Router, private loader: LoaderService, private ar: ActivatedRoute, private ss : StateService) { 
      this.unsub$ = new Subject();
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
      // if(!this.ad._id){
      // }
    });

    this.ss.getUserSessionObservable().subscribe((session)=>{
      if(!session._id) {
        this.ps.newMessage('error', 'Login Needed', 'Please login to perform this action');
        this.router.navigate(['/']);
      }
    })

    this.ar.queryParams.subscribe((data)=>{
      if(data.action == 'edit')
        if(data.adId) 
          this.getAdData(data.adId);
    })

    this.get_country().then(()=>{
      //preset all selectors if the ad already has country, state and city;
      this.ps.AdObservable().pipe(takeUntil(this.unsub$)).subscribe((ad: Ad)=>{
        if(ad?.country){
           //searches for matching country data using countryName from contries array;
           const countryDetails = this.countries.find((country)=> {
             return ad.country == country.countryName;
           });
           this.selectedCountry = countryDetails? countryDetails._id : "";
           this.selectedCountryName = countryDetails? countryDetails.countryName: "";
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

  getAdData(adId : string) {
    // gets ad data from server if ad data is not present in cache.
    this.ps.get_ad(adId).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      if(response.status) {
        this.ps.NewAdData(response.data);
      } else {
        this.ps.newMessage('error', 'No Data', response.message);
      }
    }, this.handle_error.bind(this));
  }

  get_country(): Promise<boolean>{
    //fetches countries from server which also contains country wise states.
    return new Promise((res, rej)=>{
      this.ds.get_countries().pipe(takeUntil(this.unsub$)).subscribe((response:any)=>{
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
      this.selectedState = null
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
          this.showCity = false; 
          return rej(false);
        })
     })
  };

  change_city(event){
     //implement if needed.
     this.saved = false;
  };

  save_location(){
    console.log(this.selectedCountry);
    if(this.emptySelect())
      return;
    this.load();
    this.ps.selectLocation(this.selectedCountry, this.selectedCountryName, this.selectedState, this.selectedCity).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
      this.stopload();
      if(response.status){
        this.ps.NewAdData(response.data);
        this.ps.newMessage('success', 'Ad Created', 'New Ad was created.');
        this.saved = true;
        
        this.nextPage();
      } else {
        console.log(response);
        alert(response.message);
        this.ps.newMessage('error', 'Couldn\'t Save', response.message);
      }
    }, this.handle_error.bind(this))
  }

  update_location(){
    if(this.emptySelect())
      return;
    this.load();
    this.ps.updateLocation(this.selectedCountry, this.selectedCountryName, this.selectedState, this.selectedCity).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
      this.stopload();
      if(response.status){
        this.ps.NewAdData(response.data);
        this.ps.newMessage('success', 'Location Updated', 'Location was updated');
        this.saved = true;
        
        this.nextPage();
      } else {
        console.log(response);
        alert(response.message);
        this.ps.newMessage('error', 'Couldn\'t Update', response.message);
      }
    }, this.handle_error.bind(this))
  }

  handle_error(error) {
    if(error instanceof ErrorEvent) 
      this.ps.newMessage('error', 'Failed', 'couldn\'t connect to the url');
    else 
      this.ps.newMessage('error', 'Failed', `${error.status}: ${error.error.message}`);   
    this.stopload();
  }

  // prevPage(){
  //   //implement confirmation
  //   if(!this.unsavedChanges())
  //     this.router.navigate(['/receiver-ad/select-category']);
  // }
  nextPage(){ 
     if(this.saved && !this.unsavedChanges())
       this.router.navigate(['/sponsor/post/ad-content']);
     else {
      if(this.ad && this.ad._id)
        this.update_location();
      else
        this.save_location();
      }
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
        console.log(this.selectedState);
        console.log(this.selectedCountryName);
        console.log(this.selectedCity);
        this.ps.newMessage('warning', 'Unsaved Changes', 'You have unsaved changes, discard them?');
         //implement confirmation toast (save or stash)
        return true;
      } else 
         return false;
     }
    }
    return false;
  }

  ngOnDestroy() : any {
    this.unsub$.next();
    this.unsub$.complete();
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
