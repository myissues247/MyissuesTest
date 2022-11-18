import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad, Contact, ServerResponse} from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService, UserSession } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { AdPostService } from '../../../services/ad-post.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {  
  submitting: boolean = false;
  contact : Contact; //local storage of contact details
  countries : any[];
  states : any[];
  cities : any[];
  ad : Ad; //reference to global Ad data locally.
  saved: boolean = false;
  session : UserSession;
  constructor(private ps : AdPostService, private ds:UserDataService, private router: Router, private loader: LoaderService, private ss : StateService) { 
    this.countries = [];
    this.states = [];
    this.cities = [];
    this.contact = {
      firstName: "",
      lastName: "",
      age: null,
      dob : "",
      country: "",
      state : "",
      city : "",
      zipCode : "",  
      contact : "",
      emergencyContact : "",
      email : "",
      neighbours1 : {
        name : "",
        contact: "",
        extension : "",
        occupation : "",
        organization : ""
      },
      neighbours2 : {
        name : "",
        contact: "",
        extension :"",
        occupation : "",
        organization :""
      }
    }
  }

  ngOnInit(): void {  
     this.ps.AdObservable().subscribe((ad: Ad)=>{
       this.ad = ad;
       if(!ad._id) {
         this.ps.newMessage('error', 'Ad Not Initialized', 'Please initialize the ad first')
         this.router.navigate(['/receiver/post/select-category']);
       }
       console.log(this.ad);
        this.contact = Object.assign({}, ad) as Contact;
       console.log(this.contact);
     });

     this.ss.getUserSessionObservable().subscribe((session)=>{
       this.contact.firstName = session.firstname;
       this.contact.lastName = session.lastname;
       this.contact.email = session.email;
     })
  }  

  ngAfterViewInit():void{
    this.get_country().then(()=>{
      setTimeout(()=>this.preset_selectors(), 1000);
    });
  }
  
  save_contact(): Promise<boolean>{
     return new Promise((res, rej)=>{
      this.ps.save_contact(this.contact).subscribe((response:ServerResponse)=>{
        if(response.status){
          this.ps.newMessage('success', 'Details Saved', 'Contact details are successfully saved');
          console.log(response.data);
          this.ps.NewAdData(response.data as Ad);
          return res(true);
        } else {
          console.log(response);
          this.ps.newMessage('error', 'Couldn\'t Save Details', response.message);
        }
        return rej(false);
      }, (error)=>{
        if(error instanceof ErrorEvent)
           this.ps.newMessage('error', 'Error Occured', 'Sorry some error occured');
        else 
           this.ps.newMessage('error', 'Error Occured', error.error.message);
        return rej(false);
      });
    })
  }

  get_country(): Promise<boolean>{
    //fetches countries from server which also contains country wise states.
    return new Promise((res, rej)=>{
      this.ds.get_countries().subscribe((response:any)=>{
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
        if(country._id == this.contact.country)
          return true;
        else 
          return false;
      });
      this.states = country.states;
      this.contact.state = country.countryName;
  };

  change_state(event): Promise<boolean>{
     //fetches city from server or cache using selectedState
     return new Promise((res, rej)=>{
        this.ds.get_cities(this.contact.country, this.contact.state).subscribe((response:any)=>{
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
          return rej(false);
        })
     })
  };
  
  change_city(event){
    //implement. 
  }
  
  preset_selectors(){
    if(this.ad.country){
      //searches for matching country data using countryName from contries array;
      const countryDetails = this.countries.find((country)=> {
        return this.ad.country == country.countryName;
      });
      this.contact.country = countryDetails? countryDetails._id : "";
      //extracts states field from selected country data;
      this.states = countryDetails? countryDetails.states : []; 
      if(this.ad.state){
        this.contact.state = this.ad.state;
        //if state is present fetch cities from server or cache;
        this.change_state({}).then(()=>{
          if(this.ad.city){
            this.contact.city = this.ad.city;
            this.saved = true;
           }
        });
      } 
   }
  }
  nextPage(form){
    //TODO : implement changes and unsaved data detection.
     if(form.status == 'INVALID')
       return this.ps.newMessage('error', 'Invalid Input', 'Please fill the form with valid inputs');
     this.load();
     this.save_contact().then(()=>{ 
       this.stopload();
      setTimeout(()=>{
        this.router.navigate(['/receiver/post/upgrades'], {queryParams: {mode: "preview"}});
       }, 1000);
     }).catch(()=> {
       this.stopload();
     })
  }
  prevPage(){
    //TODO : implement local cache for unsaved data;
    this.router.navigate(['/receiver/post/upload-images']);
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
