import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-allwithdraw',
  templateUrl: './allwithdraw.component.html',
  styleUrls: ['./allwithdraw.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AllwithdrawComponent implements OnInit {
  totalWRequests = 0;
  skip  = 0;
  limit = 30;

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
    // this.id=await this.route.snapshot.paramMap.get('id');
    // this.getWithdrawalRequests(false);
    // this.getTotal();
  }


  getWithdrawalRequests(withTotal) {
        this.ds.withdrawRequest({withTotal, skip: this.skip, limit: this.limit}).subscribe((response)=>{
          if(response.status==true){
              console.log(response);
              this.post=response.data.wRequests;
              this.totalWRequests = response.data.total || this.totalWRequests;
          }else {
            this.messageService.add({severity: 'error', summary: "Couldn't Fetch", detail: response.message})
          }
        }, this.handle_error.bind(this))
  }

  getTotal() {
    this.ds.getWithdrawRequestTotal().subscribe((response)=>{
      if(response.status) {
        this.totalWRequests = response.data || 0;
      }
    }, this.handle_error.bind(this))
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
    this.skip = event.first;
    this.limit = event.rows;
    this.getWithdrawalRequests(!this.totalWRequests);
  }


  // Start of Show  Banner Modal

  showProduct(product) {
    this.products = { ...product };
   console.log(this.products);
   
    this.showDialog = true;
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  // End of Show  Banner Modal


  
  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getWithdrawalRequests(false);
        
      this.loading = true;
      this.ds.bulkSearch_wRequests({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.wRequests;
          this.totalWRequests = response.data.total || this.totalWRequests;
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handle_error.bind(this))
    }
  }

handle_error(error) {
  if(error instanceof ErrorEvent)  
    this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the client"});
  else 
    this.messageService.add({severity: 'error', summary: "Error", detail: error.status + ": " + error.error.message});
  this.loading = false;
}

}
