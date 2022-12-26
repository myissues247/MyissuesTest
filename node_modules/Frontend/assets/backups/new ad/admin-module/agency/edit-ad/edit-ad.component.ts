import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EditAdComponent implements OnInit {
  items = [];
  id;
  siteDetail;
  selectedProducts;
  first;
  loading;
  adId;
  cause;

  categories = [];
  countries = [];
  states = [];
  cities = [];


  dobConverted = "";
  constructor(private route: ActivatedRoute, private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService, private router: Router) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-pw pi-user', label: ' Receiver' }
    ]
  }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id');
    this.ds.getSingleAd(this.id).subscribe(async (response) => {
      if (response.status) {
        console.log(response.data);
        this.siteDetail = [response.data];
        console.log(this.siteDetail);
        this.get_ad_options();
      }
    }, (err) => {
      console.log(err)
    });
  }


  get_ad_options() : any {
    this.loading = true;
    this.ds.get_edit_ad_selector_agency().subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.countries = response.data.countries;
        this.categories  = response.data.categories;
        const country = this.countries.find((country)=>{
          if(country.countryName == this.siteDetail[0].country)
            return true;
          else 
            return false;
        });
        this.siteDetail[0].countryId = country._id;
        this.change_state({target: {value : this.siteDetail[0].state}});
        this.states = country.states;
        this.siteDetail[0].countryName = country.countryName;
      } else {
        this.messageService.add({severity: 'error',summary :  'Failed', detail: 'couldn\'t fetch Countries'});
      } 
    }, (error)=>{
      if(error instanceof ErrorEvent) 
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'couldn\'t connect to the url'});
      else 
        this.messageService.add({severity: 'error', summary:  'Failed', detail: `${error.error.message}`});
      this.loading = false;
    })
  }

  change_category(event) {
    this.siteDetail[0].categoryName = event.target.options[event.target.selectedIndex].text;
    this.siteDetail[0].categoryId = event.target.value;
    console.log(this.siteDetail[0].categoryName);
    console.log(this.siteDetail[0].categoryId);
  }
  
  change_country(event){
    //finds data of the selected country from countries array and extracts states.
    this.siteDetail[0].country = event.target.value;
    const country = this.countries.find((country)=>{
      if(country.countryName == this.siteDetail[0].country)
        return true;
      else 
        return false;
    });
    this.siteDetail[0].countryId = country._id;
    this.states = country.states;
    this.siteDetail[0].countryName = country.countryName;
    this.siteDetail[0].state  = null;
};


change_state(event): Promise<boolean>{
  //fetches city from server or cache using selectedState
  this.siteDetail[0].state = event.target.value;
  this.loading = true;
  return new Promise((res, rej)=>{
     this.ds.get_cities(this.siteDetail[0].countryId, this.siteDetail[0].state).subscribe((response:any)=>{
       this.loading = false;
       if(response.status){
         this.cities = response.data[0].cities;
         //implement caching for cities.
         return res(true);
       } else {
         console.log(response);
         this.messageService.add({severity: 'error',summary :  'Cities Fetch Failed', detail:  response.message});
       }
       return rej(false);
     }, (error)=>{
       if(error instanceof ErrorEvent) 
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'couldn\'t connect to the url'});
       else 
        this.messageService.add({severity: 'error', summary:  'Failed', detail: `${error.error.message}`});
       this.loading = false;   
       return rej(false);
     })
  })
};
  
  change_city(event) {
    this.siteDetail[0].city = event.target.value;
  }

  deleteAdImage(adImage, i) {
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Permanently Delete this Image?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.loading = true;
          this.ds.deleteAdImage_agency(this.siteDetail[0]._id, adImage).subscribe((response)=>{
            this.loading = false;
            if(response.status) {
              this.messageService.add({severity: 'success',summary: 'Delete Ad Image',detail: 'Image was deleted from server'});
              if(this.siteDetail[0].adImages[i] == adImage) {
                this.siteDetail[0].adImages.splice(i, 1);
              } else {
                const findIndex = this.siteDetail[0].adImages.indexOf(adImage);
                this.siteDetail[0].adImages.splice(findIndex, 1);
              }
            } else {
              this.messageService.add({severity: 'error',summary: 'Failed To Delete',detail: response.message});
            }
          }, (error)=>{
            if(error instanceof ErrorEvent) 
             this.messageService.add({severity: 'error', summary: 'Failed', detail: 'couldn\'t connect to the url'});
            else 
             this.messageService.add({severity: 'error', summary:  'Failed', detail: `${error.error.message}`});
            this.loading = false;   
          });
      },
      reject: () => {
      }
    });
  }
  
  update_ad(editForm) {
    console.log(editForm);
    if(editForm.status == "INVALID" || !this.siteDetail[0].description || !this.siteDetail[0].city || !this.siteDetail[0].state || !this.siteDetail[0].country || !this.siteDetail[0].categoryName || !this.siteDetail[0].contact)
      return this.messageService.add({severity: 'error', summary: "Invalid Form Data", detail: "Please fill all the details correctly"})
      this.cnfrm.confirm({
        message: 'Are you sure that you want to save the changes?',
        header: 'Confirmation',
        acceptButtonStyleClass: 'p-button-warning',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.ds.updateAd_agency(this.siteDetail[0]).subscribe((response)=>{
            if(response.status) {
              this.messageService.add({severity: 'success', summary: 'Ad updated', detail: response.message});
              setTimeout(()=>{this.router.navigate(["/admin-module/agency/ad/", this.siteDetail[0]._id])}, 1000);
            } else {
              this.messageService.add({severity: 'error', summary: 'Couldn\'t Update Ad', detail: response.message})
            }
          }, (error)=>{
            if(error instanceof ErrorEvent) 
             this.messageService.add({severity: 'error', summary: 'Failed', detail: 'couldn\'t connect to the url'});
            else 
             this.messageService.add({severity: 'error', summary:  'Failed', detail: `${error.error.message}`});
            this.loading = false;   
          })
        },
        reject: () => {
        }
      });
  }
}
