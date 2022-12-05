import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {
  sponsors : any[] = []
  
  cities: any[] = [];
  categories : any[] = [];

  selectedCity : string = "";
  selectedCategory : string = ""; //categoryId;
  selectedCategoryName : string = "";
  agencies : any[] = null;
  
  tab = 1;
  responsiveOptions: any[];
  constructor(private ds: UserDataService) { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  ngOnInit(): void {
    this.get_cities();
    this.get_sponsors();
  }

  get_cities() : any {
    this.ds.get_all_cities().subscribe((response)=>{
      if(response.status) {
        console.log(response.data);
        this.cities = response.data.cities[0].allCities;
        this.categories = response.data.agencyCategories;
      } else {
        this.ds.newMessage("error", "Couldn't Fetch Cities", response.message)
      }
    }, this.handle_error.bind(this))
  }

  get_sponsors() {
    this.ds.getSiteSponsors().subscribe((response)=>{
      if(response.status) {
        console.log(response);
        this.sponsors = response.data;
      } else {
        console.log(response);
      }
    }, (error)=>{
      console.log(error);
    })
  }

  select_category(event) {
    const categorySelect = event.target;
    this.selectedCategoryName = categorySelect.options[categorySelect.selectedIndex].text;
    console.log(this.selectedCategoryName);
    this.selectedCategory = event.target.value;
  }

  get_agencies() : any { 
    if(!this.selectedCity) 
      return this.ds.newMessage('info', 'Can\'t Search', 'Please select city');
    if(!this.selectedCategory)
      return this.ds.newMessage('info', 'Can\'t Search', 'Please select category');
    const query = {
      city: this.selectedCity,
      category: this.selectedCategory
    }
    this.ds.get_agencies(query).subscribe((response)=>{
      if(response.status) {
        if(response.status) {
          this.agencies = response.data;
          console.log(response.data);
        }
      } else {
        this.ds.newMessage('error', 'Couldn\'t Fetch Agencies', response.message);
      }
    }, this.handle_error.bind(this));
  }
  
  handle_error(error){
    if(error instanceof ErrorEvent)
      this.ds.newMessage("error", "Unknown Error Occured", "Sorry Some error occured on the client");
    else 
      this.ds.newMessage("error", "Couldn't Fetch Cities", error.error.message)
  }

}
