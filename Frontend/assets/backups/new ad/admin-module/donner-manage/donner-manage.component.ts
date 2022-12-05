import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-donner-manage',
  templateUrl: './donner-manage.component.html',
  styleUrls: ['./donner-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DonnerManageComponent implements OnInit {
  totalRecords :number= 0;
  first:number=0;
  last:number=0;
  skip = 0;
  limit = 30;

  submitting : boolean = true;
  imagepath;
  products;
  product;
  items=[];
  post;
  selectedProducts;

  loading;
  showDialog=false;
  accessOption;
  total: number = 0;
  unapproved: number = 0;
 
  selectedAccess;
  cause;
  donor;
  donorId;
  constructor(private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService, private loader: LoaderService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-fw pi-user', label: ' Doner' }
    ];
    this.accessOption=[{label:'Low',value:0},{label:'Med',value:1},{label:'High',value:2}]
   }

  ngOnInit(): void {
    this.getDonors(true)
  }

  getDonors(withTotal) {
    this.loading = true;
    this.ds.Get_Doner({withTotal}).subscribe((response)=>{
      this.loading = false;
      if(response.status==true){
          //this.post=response.data.doners;
          this.totalRecords = response.data.total;
          console.log(response.data);
      } else {
        this.messageService.add({severity: 'error', summary: "Couldn't Fetch Donors", detail: response.message});
      }
    }, this.handle_error.bind(this))
  }

  newProduct(){}
  showProduct(post){
      // this.products={ ...post } ;
      // this.showDialog = true;
    this.loading = true;
    this.ds.GetDonerSingle(post._id).subscribe((response)=>{
      this.loading = false;
      if(response.status)  {
        this.products = response.data;
        console.log(response.data);
        this.showDialog = true;
      } else {
        this.messageService.add({severity: "error", summary: "Couldn\'t Fetch Details", detail: response.message});
      }
    }, this.handle_error.bind(this) ) 

  }
  
    hideshowDialog() {
      this.showDialog = false;
    }
  
  editProduct(product){}
  deleteBanner(product){}
  //  Start of Enable of Banner
  enable(i,doner) {
    
    setTimeout(() => {
      this.cnfrm.confirm({
        message: 'Are you sure that you want to approve this Donner?',
        header: 'Confirmation',
        acceptButtonStyleClass: 'p-button-success',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loading=true;
          this.load();
          this.ds.DonerApprove({ donerId: i, status: true,doner}).subscribe((response) => {
            this.stopload();
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.loading = true;
              this.ds.Get_Doner({}).subscribe((response) => {  this.loading = false;
                if (response.status == true) {
                  this.loading=false;
                  this.post=response.data.doners;
                }
                else
                  this.messageService.add({severity: 'error', summary: "Couldn't Fetch Donors", detail: response.message});
              }, this.handle_error.bind(this) )
            }
            else
              this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
          }, this.handle_error.bind(this))
  
        },
        reject: () => {
        }
      });
  
  
      
    }, 1000);

   
  }

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(i,doner) {

   
    setTimeout(() => {
      this.cnfrm.confirm({
        message: 'Are you sure that you want to reject this Donor?',
        header: 'Confirmation',
        acceptButtonStyleClass: 'p-button-danger',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.donorId = i;
          this.donor = doner
          document.getElementById('click2').click();
        },
        reject: () => {
        }
      });
    }, 1000);
  }
  
  disableDonorHandler() {
    this.loading=true;
    this.load();
    this.ds.DonerReject({ donerId: this.donorId, status: false, doner: this.donor, cause: this.cause }).subscribe((response) => {
            this.stopload();
            if (response.status == true)
           
            {
              this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: response.message });
              this.loading = true;
              this.ds.Get_Doner({}).subscribe((response) => { 
                this.loading = false;
                if (response.status == true) {
                  this.post=response.data.doners;
                  document.getElementById('close').click();
                  this.cause=null;
                }
                else
                  this.messageService.add({severity: 'Couldn\'t Fetch Donors', summary: "Failed", detail: response.message});
              }, this.handle_error.bind(this))
            }
            else
              this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
          }, this.handle_error.bind(this))
  }
  //  End of Disable of Banner


  showDonations(id) {
    this.router.navigate(['/admin-module/donations'], {queryParams: {donerId: id}});
  }

  loadCustomers(event:LazyLoadEvent){
    setTimeout(() => {
      this.loading = true;

      this.ds.Get_Doner({ skip: event.first, limit: event.rows }).subscribe((response)=>{
        this.loading = false;
        if(response.status==true){
            this.post=response.data.doners;
        } else {
          this.messageService.add({severity: 'error', summary: "Couldn't Fetch Donors", detail: response.message});
        }
      }, this.handle_error.bind(this))

    }, 1000);

  }
  
  
  load() {
    this.loader.start();
    this.submitting = true;
  }

  stopload() {
    this.loader.stop();
    this.submitting = false;
  }

  
  accessChange(event, donerId,doner){
    this.donorId = donerId;
    this.donor = doner;
    this.selectedAccess = event.option.value;
    if(this.selectedAccess == 2)
      this.accessChangeHandler();
    else 
     document.getElementById('click3').click();
  }

  accessChangeHandler() {
    let access= this.selectedAccess;
    let donerId = this.donorId;
    let doner = this.donor;
    if(isNaN(access)) return alert('Access Level Wrong')
    if(access != 0 && access != 1 && access != 2) return alert('Access Level Is Invalid')
    this.loading=true;
   setTimeout(() => {
     this.loading=true;

     this.ds.change_Doner_Access({access, donerId,doner, cause: this.cause}).subscribe(async (response)=>{
       if(response.status){
           await this.messageService.add({ severity: 'success', detail: response.message });
           this.cause = null
           document.getElementById('close1').click();
            await  this.ds.Get_Doner({}).subscribe((response)=>{
              if(response.status==true){
                this.loading=false;
                  this.post=response.data.doners;
              } else {
                this.messageService.add({severity: 'error', summary: "Couldn't Fetch Donors", detail: response.message});
              }
            }, this.handle_error.bind(this))

       }else{ 
         this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
       }
     }, this.handle_error.bind(this))
     
   }, 100);
  }

  
  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value)
        return this.getDonors(false);
      this.loading = true;
      this.ds.bulkSearch_donors({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.donors;
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
