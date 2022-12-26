import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DonationsComponent implements OnInit, OnDestroy {
  id ;
  imagepath;
  products={
    name:null,
    amount:null,
    image:null,
    mode:null,
    createdOn:null,
    status:null
  };
  product;
  items=[];
  post;
  selectedProducts;
  first:number;
  loading;
  cause;
  showDialog=false;
  adId;
  constructor(private route:ActivatedRoute,private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { label: 'Payment',
      icon: 'pi pi-pw pi-money-bill',},
      { label: 'Withdraw Request', icon: 'pi pi-fw pi-money-bill' }
    ];
   }

 async ngOnInit() {
     let donerId = undefined;
     donerId= await this.route.queryParams.pipe(first()).toPromise().then((data)=>{
       return data.donerId
     })

     await  this.ds.getDonations({donerId}).subscribe((response)=>{
      if(response.status==true){
          this.post=response.data;
          console.log(response.message);  
      } else {
        this.messageService.add({severity: 'error', summary: "Couldn't Fetch Donations", detail: response.message});
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)  
        this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the client"});
      else 
        this.messageService.add({severity: 'error', summary: "Error", detail: error.status + ": " + error.error.message});
    })
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  enable(ev){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Publish this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.updateReceiverAd({ adId: ev, status: true }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.ds.getReceiverAllAds({id:this.id}).subscribe((response)=>{
              if(response.status==true){
                  this.post=response.data;
              }
            },(err)=>{
              console.log(err)
            })
          }
          else
            alert(response.message)
        })

      },
      reject: () => {
      }
    });
  }
  disable(ev){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Deactive this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.updateReceiverAd({ adId: ev, status: false }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            this.ds.getReceiverAllAds({id:this.id}).subscribe((response)=>{
              if(response.status==true){
                document.getElementById('close').click();
                  this.post=response.data;
                  this.cause=null;
              }
            },(err)=>{
              console.log(err)
            })
          }
          else
            alert(response.message)
        })

      },
      reject: () => {
      }
    });
  }

  approveAd(adId){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.approveReceiverAd({ adId: adId }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.ds.getReceiverAllAds({id:this.id}).subscribe((response)=>{
              if(response.status==true){
                  this.post=response.data;
              }
            },(err)=>{
              console.log(err)
            })
          }
          else
            alert(response.message)
        })

      },
      reject: () => {
      }
    });

  }

  rejectAd(adId){
    this.adId=adId;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        document.getElementById('click2').click();

      },
      reject: () => {
      }
    });
  }

  disableAd(){
    this.ds.rejectReceiverAd({ adId: this.adId,rejectionCauses:this.cause }).subscribe((response) => {
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
        this.ds.getReceiverAllAds({id:this.id}).subscribe((response)=>{
          if(response.status==true){
            document.getElementById('close').click();
              this.post=response.data;
              this.cause=null;
          }
        },(err)=>{
          console.log(err)
        })
      }
      else
        alert(response.message)
    })
  }

  loadCustomers(event:LazyLoadEvent){
    // console.log(event.first)
    // console.log(event.rows)
  }


  // Start of Show  Banner Modal

  showProduct(product) {
    // this.products = { ...product };
    // console.log(this.products);
    
    //  this.showDialog = true;
    this.loading = true;
    this.ds.getDonationDetail(product._id).subscribe((response)=>{
      this.loading = false;
      if(response.status) {
        this.products = response.data;
        console.log(this.products);
        
         this.showDialog = true;
      } else {
        this.messageService.add({severity: 'error', summary: 'Couldn\'t Fetch Details', detail: response.message});
      }
    }, this.handle_error.bind(this) )
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  // End of Show  Banner Modal


   handle_error (error){
    if(error instanceof ErrorEvent)  
      this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the client"});
    else 
      this.messageService.add({severity: 'error', summary: "Error", detail: error.status + ": " + error.error.message});
    this.loading = false;
  }

  ngOnDestroy() : void {}
}
