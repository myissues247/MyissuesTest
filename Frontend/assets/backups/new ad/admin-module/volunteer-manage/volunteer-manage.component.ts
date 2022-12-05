import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/services/loader.service';


export interface Days {
  _id: string,
  monday : boolean,
  tuesday: boolean,
  wednesday: boolean,
  thrusday :boolean,
  friday: boolean,
  saturday: boolean,
  sunday : boolean,
}

export interface Time {
    _id:string,
    morning: boolean,
    afternoon: boolean,
    evening: boolean,
}

export interface Volunteer {
  firstname: string,
  lastname : string,
  email : string,
  contact : string,
  city?: string,
  message: string,
  helpIn : string[] | any,
  days : Days | any,
  time : Time | any
}

@Component({
  selector: 'app-volunteer-manage',
  templateUrl: './volunteer-manage.component.html',
  styleUrls: ['./volunteer-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class VolunteerManageComponent implements OnInit {
  totalVolunteers = 0;
  skip = 0;
  limit = 30;

  submitting: boolean = false;
  imagepath;
  products : Volunteer;
  product;
  items=[];
  post = [];
  selectedProducts;
  first:number;
  loading;
  showDialog=false;
  showEditDialog=false;
  timeCount : number = 0;
  daysCount : number = 0;
  cities : any[] = [];
  helpInPreset = [];

  constructor(private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService, private loader: LoaderService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-cog', label: ' Additional Setting' },
      { icon: 'pi pi-fw pi-user-plus', label: ' Volunteer' }
    ];
   }

  ngOnInit(): void {
    this.getVolunteers(true);
  }

  getVolunteers(withTotal) {
    this.loading=true;
    this.ds.get_volunteers_all({withTotal, skip: this.skip, limit: this.limit}).subscribe((response)=>{
      this.loading=false;
      if(response.status==true){
        this.totalVolunteers=response.data.total;
      } else {
        this.messageService.add({severity: "error", summary: "Couldn\'t Fetch Data", detail: response.message })
      }
    }, this.handle_error.bind(this))
  }

  newProduct(){}
  showProduct(post){
    // this.products={ ...post } ;
    // this.showDialog = true;
   this.ds.get_volunteer_single(post._id).subscribe((response)=>{
     if(response.status) {
       console.log(response.data);
       this.products = response.data;
       this.products.helpIn = this.products.helpIn.join(', '); 
       
       delete this.products.time._id;
       this.products.time = Object.keys(this.products.time).join(', ');

       delete this.products.days._id;
       this.products.days = Object.keys(this.products.days).join(', ');

       this.showDialog = true;
     } else {
       this.messageService.add({
         severity: "info", 
         summary: "Couldn't Fetch Volunteer",
         detail: "Couldn't fetch volunteer's"
       })
     }
   }, this.handle_error.bind(this));
    
  }

  showEditProduct(post) {
    this.ds.get_volunteer_single(post._id).subscribe((response)=>{
      if(response.status) {
        console.log(response);
        this.products = response.data;
        this.presetCheckedHelpIn(this.products.helpIn);
        if(this.cities.length > 0) {
          this.showEditDialog = true;
        } else if(localStorage.getItem('cities')) {
          this.cities = JSON.parse(localStorage.getItem('cities'));
          this.showEditDialog = true;
        } else {
          this.get_all_cities();
        }
      } else {
        this.messageService.add({severity: "error", summary: "Couldn\'t Fetch Data", detail: response.message })
      }
    }, this.handle_error.bind(this));
  }
  
    hideshowDialog() {
      this.showDialog = false;
      this.showEditDialog  = false;
    }
  
  editProduct(product){}
  deleteBanner(product){}
  //  Start of Enable of Banner
  enable(i) {
    const self = this;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to approve this volunteer?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        self.load();
        this.ds.approve_volunteer(i).subscribe((response) => {
          self.stopload();
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            for(let volunteer of this.post) {
              if(volunteer._id == i) {
                 volunteer.approved = 2;
                 break;
              }
            }
          }
          else
            this.messageService.add({severity: 'error', summary: 'Couldn\'t Approve ', detail: response.message})
        }, self.handle_error.bind(self))

      },
      reject: () => {
      }
    });


  }

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(i) {
    const self = this;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to reject this volunteer?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        self.load()
        this.ds.reject_volunteer(i).subscribe((response) => {
          self.stopload()
          if (response.status == true)
         
          {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            for(let volunteer of this.post) {
              if(volunteer._id == i) {
                 volunteer.approved = 1;
                 break;
              }
            }
          }
          else
          this.messageService.add({severity: 'error', summary: 'Couldn\'t Reject', detail: response.message})
        }, self.handle_error.bind(self))

      },
      reject: () => {
      }
    });

  }

  //  End of Disable of Banner

  

  loadVolunteer(event:LazyLoadEvent){
      setTimeout(() => {
        this.loading = true;
  
      this.ds.get_volunteers_all({withTotal:true, skip: event.first, limit: event.rows}).subscribe((response)=>{
          this.loading=false;
          if(response.status==true){
              this.post=response.data.volunteers;
          } else {
            this.messageService.add({severity: "error", summary: "Couldn\'t Fetch Data", detail: response.message })
          }
        }, this.handle_error.bind(this))
  
      }, 1000);

  
    
  }


  handle_error(error) {
    if(error instanceof ErrorEvent)
      alert("Sorry, some error occured on the client");
    else 
      alert(error.status + ": " + error.error.message);
    this.stopload()
  }



  daysControl(event) {
    const checkbox = event.target;
    if(checkbox.checked && !this.products.days[checkbox.value]) {
      this.daysCount++;
      this.products.days[checkbox.value] = true;
    } else {
      this.daysCount--;
      this.products.days[checkbox.value] = false;
    }
  }

  timeControl(event) {
    const checkbox = event.target;
    if(checkbox.checked && !this.products.time[checkbox.value]) {
      this.timeCount++;
      this.products.time[checkbox.value] = true;
      console.log('hello')
    } else {
      this.timeCount--;
      console.log(this.products.time[checkbox.value])
      this.products.time[checkbox.value] = false;
      console.log(this.products.time[checkbox.value])
    }
  }

  helpControl(event) {
    const checkbox = event.target;
    const alreadyPresent = this.products.helpIn.indexOf(checkbox.value);
    if(checkbox.checked && alreadyPresent == -1) {
      this.products.helpIn.push(checkbox.value);
      this.presetCheckedHelpIn(this.products.helpIn);
    } else {
      this.helpInPreset[alreadyPresent] = false;
      this.products.helpIn = this.products.helpIn.filter((value)=> value != checkbox.value)
    }
  }

  select_city(event) {
    this.products.city = event.target.value;
  }

  get_all_cities() : void {
    this.ds.get_only_cities().subscribe((response)=>{
      if(response.status) {
        this.cities = response.data.cities[0];
        localStorage.setItem('cities', JSON.stringify(response.data.cities[0]));
      } else {
        this.messageService.add({severity: "error", summary: "Couldn't Fetch Cities", detail: response.message})
      }
    }, this.handle_error.bind(this));
  }


  presetCheckedHelpIn(helpIn) {
    const array = [
      "Sign up people in your community that need help",
      "Assitant in the food bank",
      "Flyer distribution in your community",
      "Delivery drivers on Crew chief drivers",
      "Volunteering in any capacity that's needed",
    ]

    for(let i = 0; i< array.length; i++) {
      if(helpIn.indexOf(array[i]) > -1) {
        this.helpInPreset[i] = true;
      } else {
        this.helpInPreset[i] = false;
      }
    }

    console.log(this.helpInPreset);
  }

  checkTick(checkBox) {
    console.log(checkBox);
    if(this.products.helpIn.indexOf(checkBox.value) > -1) {
      checkBox.checked = true;
    }
  }


  load() {
    this.loader.start();
    this.submitting = true;
  }

  stopload() {
    this.loader.stop();
    this.submitting = false;
  }

  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getVolunteers(false);
        
      this.loading = true;
      this.ds.bulkSearch_volunteer({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.volunteers;
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handle_error.bind(this))
    }
  }
}
