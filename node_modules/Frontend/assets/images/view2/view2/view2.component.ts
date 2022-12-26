import { Route } from '@angular/compiler/src/core';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ad } from 'src/app/services/dataModels';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ElementRef } from "@angular/core";

interface Query{
  stateName : string,
  cityName : string,
  category : string,
  skip: Number,
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
export class View2Component implements OnInit {
  unsub$;
  defaultImage = 'assets/images/banner1.jpg'
  products: any[]; 

  //sortOptions: any[];

  sortOrder: number;

  sortField: string;

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
    ads : AdSmall[];
    query : Query;
    display: boolean;

    post : any[] = [];
    
    submitting  = false;
    loading = false;
    viewDiv
gridViewDiv;
//=document.getElementById('grid');
listViewDiv;
//=document.getElementById('list');
  constructor(private ds: UserDataService, private ss: StateService, private router: Router, private ar: ActivatedRoute,private el:ElementRef) {
    this.ads = [];
    this.query = {
      stateName: undefined,
      cityName : undefined,
      category : undefined,
      skip : 0
    };

    this.unsub$ = new Subject();
  }
  

ngOnInit(): void {

 // this.productService.getProducts().then(data => this.products = data);
    
    const category =  this.ar.snapshot.paramMap.get('category');
    console.log(category);
    this.query.category = category;

    this.get_ads();
    this.get_countries();
    this.get_categories();
    this.viewDiv=this.el.nativeElement.querySelector('#posts .item');
    this.gridViewDiv=this.el.nativeElement.querySelector('#grid');
    this.listViewDiv=this.el.nativeElement.querySelector('#list');
  
}

onSortChange(event) {
  let value = event.value;

  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  }
  else {
      this.sortOrder = 1;
      this.sortField = value;
  }
}



  get_ads(){
    this.ds.get_ads(this.query).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      if(response.status){
        console.log(response);
        this.ads = response.data;
      } else {
        console.log(response);
        alert(response.message);
      }
    }, this.handle_error.bind(this))
  }

  get_categories(){
    this.categories = this.ss.fromCache('categories');
    if(!this.categories){
      this.ds.GetLayout({}).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
        if(response.status){
          this.categories = response.data.categories;
          this.ss.toCache('categories', this.categories);
        } else {
          alert(response.message);
          console.log(response);
        }
      },  this.handle_error.bind(this))
    }
  }
  get_countries(){
    this.ds.get_countries().pipe(takeUntil(this.unsub$)).subscribe((response:any)=>{
      if(response.status){
        console.log(response);
        this.countries = response.data;
      } else {
        console.log(response.message);
        alert(response.message);
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
     console.log(country);
     this.states = country[0].states;
  }

  change_state(event){
    console.log(this.selectedCountry);
    const stateName = event.value;
    this.selectedStateName = event.value;
    this.ds.get_cities(this.selectedCountryId, stateName).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
      if(response.status){
        console.log(response);
        this.cities = response.data[0].cities;
      } else {
        console.log(response);
        alert(response.message);
      }
    }, this.handle_error.bind(this))
  }

  change_city(event){
    this.query.stateName = this.selectedStateName;
    this.query.cityName = this.selectedCityName; 
    this.get_ads();
  }

  change_category(event){
    this.query.category= event.value;
    console.log(this.query);
    this.get_ads(); 
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
    if(error instanceof ErrorEvent)
      alert('sorry couldn\'t connect to the url');
    else 
       alert(error.status + ": " + error.error.message);
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

  listView(){
    this.viewDiv.classList.add('col-md-12');
    this.gridViewDiv.classList.remove('active');
    this.listViewDiv.classList.add('active');

  }

  gridView(){
     this.viewDiv.classList.remove('col-md-12');
     this.viewDiv.classList.add('col-md-4');
     this.gridViewDiv.classList.add('active');
     this.listViewDiv.classList.remove('active');
  }
}
