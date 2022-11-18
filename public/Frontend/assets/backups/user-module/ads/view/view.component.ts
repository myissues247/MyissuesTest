import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';
import { Ad } from '../../../services/dataModels';
import { StateService } from '../../../services/state.service';
import { Router } from '@angular/router';
interface Query{
  stateName : string,
  cityName : string,
  category : string,
  skip: Number,
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
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
    selectedCategory : string;
    ads : Ad[];
    query : Query;
    display: boolean;
    constructor(private ds: UserDataService, private ss: StateService, private router: Router) {
      this.query = {
        stateName: undefined,
        cityName : undefined,
        category : undefined,
        skip : 0
      };
    }

  ngOnInit(): void {
    this.get_ads();
    this.get_countries();
    this.get_categories();
  }

  get_ads(){
    this.ds.get_ads(this.query).subscribe((response)=>{
      if(response.status){
        console.log(response);
        this.ads = response.data;
      } else {
        console.log(response);
        alert(response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
       alert('sorry couldn\'t connect to the url');
      else {
        alert(error.status + ":" + error.error.message);
      }
    })
  }
  get_categories(){
    this.categories = this.ss.fromCache('categories');
    if(!this.categories){
      this.ds.GetLayout({}).subscribe((response: any)=>{
        if(response.status){
          this.categories = response.data.categories;
          this.ss.toCache('categories', this.categories);
        } else {
          alert(response.message);
          console.log(response);
        }
      },  (error)=>{
        if(error instanceof ErrorEvent)
          alert('sorry couldn\'t connect to the url');
        else 
           alert(error.status + ": " + error.error.message);
      })
    }
  }
  get_countries(){
    this.ds.get_countries().subscribe((response:any)=>{
      if(response.status){
        console.log(response);
        this.countries = response.data;
      } else {
        console.log(response.message);
        alert(response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
        alert('sorry couldn\'t connect to the url');
      else 
         alert(error.status + ": " + error.error.message);
    })
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
     console.log(country);
     this.states = country[0].states;
  }

  change_state(event){
    console.log(this.selectedCountry);
    const stateName = event.value;
    this.selectedStateName = event.value;
    this.ds.get_cities(this.selectedCountryId, stateName).subscribe((response: any)=>{
      if(response.status){
        console.log(response);
        this.cities = response.data[0].cities;
      } else {
        console.log(response);
        alert(response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
         alert('sorry couldn\'t connect to the url');
      else 
         alert(error.status + ": " + error.error.message);
         
    })
  }

  change_city(event){
    this.query.stateName = this.selectedStateName;
    this.query.cityName = this.selectedCityName; 
  }

  change_category(event){
    this.query.category= event.value; 
  }

  apply(){
    this.display = false;
    this.get_ads();
  }

  view_full(adId){
    this.router.navigate(['/full'], {queryParams: {ad : adId}});
  }
} 
