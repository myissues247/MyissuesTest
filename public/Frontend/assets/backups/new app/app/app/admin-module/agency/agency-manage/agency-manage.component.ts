import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserDataService } from 'src/app/services/user-data.service';
import { Agency } from 'src/app/services/dataModels';

@Component({
  selector: 'app-agency-manage',
  templateUrl: './agency-manage.component.html',
  styleUrls: ['./agency-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AgencyManageComponent implements OnInit {
  totalAgencies = 0
  skip = 0;
  limit = 30;
  
  imagepath = environment.server;
  //imagepath = 'http://18.223.136.68/';
  titleProp;
  descProp;
  imageProp;
  sequenceProp;
  statusProp;
  data;
  editData;
  items = [];
  product;
  selectedProducts;
  products;
  productDialog: boolean;
  submitted;
  uploadedFiles: any[] = [];
  stateOptions;
  fileUpload: FileUpload
  post;
  editDialog: boolean;
  showDialog: boolean;
  cityProp;
  categoryProp;
  loading:boolean;
  city;
  accessOption;
  spinner = false;
  cities = [];
  categories = [];
  agencyData : Agency;

  selectedAccess;
  agencyId;
  agency;
  cause;
  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService, private router: Router, private uds: UserDataService) {

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { label: 'Agency', icon: 'pi pi-fw pi-sitemap' },
      { label: ' Manage', icon: 'pi pi-fw pi-user' }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

    // Access Option
    this.accessOption=[{label:'Low',value:0},{label:'Med',value:1},{label:'High',value:2}]
  }

  ngOnInit(): void {
    // this.getAgencies(true);
  }

  getAgencies(withTotal) {
    this.loading = true;
    this.ds.getAllAgencyDetail({withTotal, skip: this.skip, limit: this.limit}).subscribe((response) => {
      this.loading = false;
      if (response.status) {
        this.post = response.data.agencys;
        this.totalAgencies = response.data.total || this.totalAgencies;
      }
      else
        this.uds.newMessage('error', "Couldn't Fetch Agencies", response.message);
     }, this.handle_error.bind(this))

  }

  showAds(productId) {
    this.router.navigate(['/admin-module/receiver-ads'], {queryParams: {userId: productId}})
  }

  // Start of Initialize Add New Banner Modal
  newProduct() {
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
  }

  // End  of Initialize Add New Banner Modal



 loadAgency(event) {
   this.skip = event.first;
   this.limit = event.rows;
   this.getAgencies(!this.totalAgencies);
}

  // Start of Show  Banner Modal

  showProduct(product) {
    this.products = { ...product };
   
    this.showDialog = true;
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  // End of Show  Banner Modal


  //  Start of Enable of Banner
  enable(agencyId,agency) {
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Agency?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {
          this.ds.approveAgency({agencyId, agency }).subscribe((response) => {
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.ds.getAllAgencyDetail({}).subscribe((response) => {
                if (response.status) {
                  this.loading=false;
                  this.post = response.data.agencys;
                }
                else
                  this.uds.newMessage('error', "Couldn't Fetch Agencies", response.message);
              }, this.handle_error.bind(this))
            }
            else
              this.uds.newMessage('error', "Couldn't Approve", response.message);
          }, this.handle_error.bind(this))
        }, 10);
      

      },
      reject: () => {
      }
    });


  }

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(agencyId,agency) {
 
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Agency?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.agency = agency;
        this.agencyId = agencyId;
        document.getElementById('click2').click();
      },
      reject: () => {
      }
    });

  }

  disableAgency() {
    this.loading=true;
        setTimeout(() => {
          this.ds.rejectAgency({agencyId: this.agencyId,agency:this.agency, cause: this.cause }).subscribe((response) => {
            if (response.status == true)
            {
              this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
              this.ds.getAllAgencyDetail({}).subscribe((response) => {
                this.loading=false;
                if (response.status) {
                  this.post = response.data.agencys;
                  document.getElementById('close').click();
                  this.cause = null;
                }
                else
                  this.uds.newMessage('error', "Couldn't Fetch Agencies", response.message);
              }, this.handle_error.bind(this))
            }
            else
              this.uds.newMessage('error', "Couldn't Reject", response.message);
          }, this.handle_error.bind(this))
        }, 10);
  }

  //  End of Disable of Banner



  accessChange(event,agencyId,agency){
    this.agencyId = agencyId;
    this.agency = agency;
    this.selectedAccess = event.option.value;
    if(this.selectedAccess == 2)
      this.accessChangeHandler();
    else 
      document.getElementById('click3').click();
  }
  
  accessChangeHandler() {
    let access=this.selectedAccess;
    const agencyId = this.agencyId;
    const agency = this.agency;
    this.loading=true;
    if(isNaN(access)) return alert('Access Level Wrong')
    if(access != 0 && access != 1 && access != 2) return alert('Access Level Is Invalid')

   setTimeout(() => {
     this.loading=true;

     this.ds.updateAccessLevel({access,agencyId,agency, cause: this.cause}).subscribe(async (response)=>{
       if(response.status){
           await this.messageService.add({ severity: 'success', detail: response.message });
            await this.ds.getAllAgencyDetail({}).subscribe((response) => {
              this.loading=false;
              if (response.status) {
                this.post = response.data.agencys;
                this.cause = null;
                document.getElementById('close1').click();
              }
              else{
                this.loading=false;
                this.messageService.add({severity: 'error', summary: "Couldn't Fetch Agencies", detail: response.message});
              }
            }, this.handle_error.bind(this))
       }else{
        this.uds.newMessage('error', "Couldn't Update Access", response.message);
       }
     },this.handle_error.bind(this))
     
   }, 10);
  }

  getCities() {
    if(sessionStorage.getItem('cities')) {
      const cache = JSON.parse(sessionStorage.getItem('cities'));
      this.cities = cache.data.cities[0].allCities;
      this.categories = cache.data.agencyCategories;
      return;
    } 
    this.ds.get_all_cities().subscribe((response)=>{
      console.log(response.data);
      if(response.status) {
        this.cities = response.data.cities[0].allCities;
        this.categories = response.data.agencyCategories;
        console.log(response.data);
        sessionStorage.setItem('cities',  JSON.stringify(response));
      } else {
        this.uds.newMessage('error', "Couldn't Fetch Cities", response.message);
      }
    }, this.handle_error.bind(this))
  };


  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getAgencies(false);
      this.loading = true;
      this.ds.bulkSearch_agency({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.agencies;
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handle_error.bind(this))
    }
  }

  handle_error(error) {
    if(error instanceof ErrorEvent)
     this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the browser"});
   else 
     this.messageService.add({severity: 'error', summary: "Failed", detail: error.error.message});
     this.loading = false;
  }

}
