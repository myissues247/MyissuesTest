import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-all-ads',
  templateUrl: './all-ads.component.html',
  styleUrls: ['./all-ads.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AllAdsComponent implements OnInit {
  totalAds =0;
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

  selectedAdId;
  constructor(private route:ActivatedRoute,private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-pw pi-user', label: ' Receiver' },
      { icon: 'pi pi-pw pi-book', label: ' Ads' }
    ];
   }

 async ngOnInit() {
    this.id=await this.route.snapshot.paramMap.get('id');
    // this.getAds(true);
  }

  getAds(withTotal) {
    this.loading = true;
    this.ds.getReceiverAllAds({withTotal, receiverId: this.id, skip: this.skip, limit: this.limit}).subscribe((response)=>{
      this.loading = false;
      console.log(response);
      if(response.status==true){
          this.post=response.data.ads;
          this.totalAds = response.data.total || this.totalAds;
          console.log(this.post);
      } else {
        this.messageService.add({severity: "error", summary: "Failed", detail: response.message});
      }
    }, this.handler_error.bind(this))
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}

  showProduct(post){
    this.products={ ...post };
    this.router.navigate(['/admin-module/receiverdetail'],{queryParams:{id:this.products[0]._id}})
  }

  enable(ev){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to enable this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.updateReceiverAd({ adId: ev, status: true }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.getAds(false);
          }
          else
            this.messageService.add({severity: "error", summary: "Failed", detail: response.message});
        }, this.handler_error.bind(this))

      },
      reject: () => {
      }
    });
  }
  disable(ev){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Deactivate this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAdId = ev;
        document.getElementById('click3').click();
      },
      reject: () => {
      }
    });
  }

  disableHandler() {
    this.ds.updateReceiverAd({ adId: this.selectedAdId, status: false, cause: this.cause }).subscribe((response) => {
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
        this.cause=null;
        this.selectedAdId =  null;
        document.getElementById('close1').click();
        
        this.getAds(false);
      }
      else
       this.messageService.add({severity: "error", summary: "Failed", detail: response.message});
    }, this.handler_error.bind(this))
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
            this.getAds(false);
          }
          else
            this.messageService.add({severity: "error", summary: "Failed", detail: response.message});
        }, this.handler_error.bind(this))

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
    this.ds.rejectReceiverAd({ adId: this.adId, rejectionCause:this.cause }).subscribe((response) => {
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
        this.cause=null;
        document.getElementById('close').click();
       
        this.getAds(false);
      }
      else
        this.messageService.add({severity: "error", summary: "Failed", detail: response.message});

    }, this.handler_error.bind(this))
  }

  loadCustomers(event:LazyLoadEvent){
    this.skip= event.first; this.limit= event.rows;
    this.getAds(!this.totalAds);
  }

  handler_error(error) {
    if(error instanceof ErrorEvent) 
      this.messageService.add({severity: "error", summary: "Error Occured", detail: "Sorry some error occured on the browser"});
    else 
      this.messageService.add({severity: "error", summary: "Failed", detail: error.error.message});
    this.loading = false;
  }


  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getAds(false);
        
      this.loading = true;
      this.ds.bulkSearch_receiver_ads({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.ads;
          this.totalAds = response.data.total || this.totalAds;
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handler_error.bind(this))
    }
  }

}
