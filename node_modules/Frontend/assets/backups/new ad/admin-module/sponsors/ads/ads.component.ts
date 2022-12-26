import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AdsComponent implements OnInit {
  totalAds = 0;
  skip = 0;
  limit = 30;

  id ;
  imagepath;
  products;
  product;
  items=[];
  post;
  selectedProducts;
  first:number;
  loading;
  cause;
  showDialog=false;
  adId;

  selectedAdId
  constructor(private route:ActivatedRoute,private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-cog', label: ' Additional Setting' },
      { icon: 'pi pi-fw pi-user-plus', label: ' Volunteer' }
    ];
   }

 async ngOnInit() {
    this.id=await this.route.snapshot.paramMap.get('sponsorId');
    this.getAds(true);
  }

  getAds(withTotal) {
   const query : any = {withTotal};
   if(this.id){
     query.receiverId  = this.id
   }
   this.loading = true;
   this.ds.getSponsorAllAds(query).subscribe((response)=>{
     this.loading = false;
      if(response.status==true){
          this.post=response.data.ads;
          this.totalAds = response.data.total || 0
          console.log(this.post);
      } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
      }
    }, this.handle_error.bind(this))
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  loadCustomers(event){}

  showProduct(post){
    this.products={ ...post };
      this.router.navigate(['/admin-module/receiverdetail'],{queryParams:{id:this.products[0]._id}})
  }
  
  enable(ev){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to show this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.updateSponsorAd({ adId: ev, status: true }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.getAds(false);
          }
          else
            this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
        }, this.handle_error.bind(this))

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
        this.selectedAdId = ev
        document.getElementById('click3').click();
      },
      reject: () => {
      }
    });
  }

  disableHandler() {
    this.ds.updateSponsorAd({ adId: this.selectedAdId, status: false, cause: this.cause }).subscribe((response) => {
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
        document.getElementById('close1').click();
        this.cause=null;
        this.getAds(false);
      } else
        this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
    }, this.handle_error.bind(this))
  }

  approveAd(adId){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.approveSponsorAd({ adId: adId }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
            this.getAds(false)
          }
          else
            this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
        }, this.handle_error.bind(this))

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
    this.ds.rejectSponsorAd({ adId: this.adId, rejectionCause:this.cause }).subscribe((response) => {
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: response.message });
        document.getElementById('close').click();
        this.cause=null;
        this.getAds(false);
      }
      else
        this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
    }, this.handle_error.bind(this))
  }

  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getAds(false);
        
      this.loading = true;
      this.ds.bulkSearch_sponsor_ads({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.ads;
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
