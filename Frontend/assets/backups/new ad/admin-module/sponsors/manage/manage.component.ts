import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ManageComponent implements OnInit {
  totalRecords = 0
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

  selectedAccess;
  sponsor;
  sponsorId;
  cause;

  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService, private router: Router) {

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { label: ' Sponsors', icon: 'pi pi-fw pi-users' },
      { label: ' Manage', icon: 'pi pi-fw pi-user' }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

    // Access Option
    this.accessOption=[{label:'Low',value:0},{label:'Med',value:1},{label:'High',value:2}]
  }

  ngOnInit(): void {
    this.getSponsor(true);

  }

  getSponsor(withTotal) {
    this.loading = true;
    this.ds.getAllSponsorDetail({withTotal}).subscribe((response) => {
      this.loading = false;
      if (response.status) {
        this.post = response.data.sponsors;
        this.totalRecords = response.data.total;
      }
      else
        this.messageService.add({severity: 'error', summary: "Couldn't Fetch Sponsors", detail: response.message});
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



 

  // Start of Show  Banner Modal

  showProduct(product) {
    this.products = { ...product };
   
    this.showDialog = true;
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  // End of Show  Banner Modal
  loadAgency(event) {
  }
  

  //  Start of Enable of Banner
  enable(sponsorId, sponsor) {

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Sponsor?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.approveSponsor({sponsorId, sponsor }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
            this.ds.getAllSponsorDetail({}).subscribe((response) => {
              if (response.status) {
                this.post = response.data.sponsors;
              }
              else
                this.messageService.add({severity: 'error', summary: "Couldn't Fetch Sponsors", detail: response.message});
            }, this.handle_error.bind(this))
          }
          else
            this.messageService.add({severity: 'error', summary: "Couldn't Approve", detail: response.message});
        }, this.handle_error.bind(this))

      },
      reject: () => {
      }
    });


  }

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(sponsorId, sponsor) {
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Sponsor?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    
        this.sponsorId = sponsorId;
        this.sponsor = sponsor;
        document.getElementById('click2').click();
      },
      reject: () => {
      }
    });

  }

  disableSponsor() {
    this.loading = true;
    this.ds.rejectSponsor({sponsorId: this.sponsorId, sponsor: this.sponsor, cause: this.cause }).subscribe((response) => {
      this.loading = false;
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
        document.getElementById('close').click();
        this.ds.getAllSponsorDetail({}).subscribe((response) => {
          this.loading = false;
          if (response.status) {
            this.post = response.data.sponsors;
            console.log(this.post)
          }
          else
            this.messageService.add({severity: 'error', summary: "Couldn't Fetch Sponsors", detail: response.message});
        }, this.handle_error.bind(this))
      }
      else
        this.messageService.add({severity: 'error', summary: "Couldn't Reject", detail: response.message});
    }, this.handle_error.bind(this))
  }

  //  End of Disable of Sponsor

  accessChange(event,sponsorId, sponsor){
    this.sponsorId = sponsorId;
    this.sponsor = sponsor;
    this.selectedAccess = event.option.value;
    if(this.selectedAccess == 2)
      this.accessChangeHandler();
    else 
      document.getElementById('click3').click();
  }

  accessChangeHandler() {
    let access=this.selectedAccess;
    this.loading=true;
    if(isNaN(access)) return alert('Access Level Wrong')
    if(access != 0 && access != 1 && access != 2) return alert('Access Level Is Invalid')

   setTimeout(() => {
     this.loading=true;

     this.ds.updateSponsorAccessLevel({access,sponsorId:this.sponsorId, sponsor: this.sponsor, cause: this.cause}).subscribe(async (response)=>{
       if(response.status){
           await this.messageService.add({ severity: 'success', detail: response.message });
            await this.ds.getAllSponsorDetail({}).subscribe((response) => {
              this.loading=false;
              if (response.status) {
                this.post = response.data.sponsors;
                this.cause = null;
                document.getElementById('close1').click();
              }
              else{
                this.loading=false;
                this.messageService.add({severity: 'error', summary: "Couldn't Fetch Sponsors", detail: response.message});
              }
            }, this.handle_error.bind(this))

       }else{
        this.messageService.add({severity: 'error', summary: "Couldn't Update Access", detail: response.message});
       }
     },this.handle_error.bind(this))
     
   }, 0);
  }


  
  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getSponsor(false);
      this.loading = true;
      this.ds.bulkSearch_sponsor({searchItem: event.target.value}).subscribe((response)=>{

        this.loading = false;
        if(response.status) {
          this.post=response.data.sponsors;
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
