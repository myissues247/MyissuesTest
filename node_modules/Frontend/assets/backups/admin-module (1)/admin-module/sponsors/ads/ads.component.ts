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
   const query : any = {};
   if(this.id){
     query.receiverId  = this.id
   }
   await  this.ds.getSponsorAllAds(query).subscribe((response)=>{
      if(response.status==true){
          this.post=response.data;
          console.log(this.post);
      }
    },(err)=>{
      alert(err.error.message);
    })
  }

  newProduct(){}
  showProduct(post){
    this.products={ ...post };
      this.router.navigate(['/admin-module/receiverdetail'],{queryParams:{id:this.products[0]._id}})
  }
  editProduct(product){}
  deleteBanner(product){}
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
            this.ds.getSponsorAllAds({receiverId:this.id}).subscribe((response)=>{
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
        this.ds.getSponsorAllAds({receiverId:this.id}).subscribe((response)=>{
          if(response.status==true){
            document.getElementById('close1').click();
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
            this.ds.getSponsorAllAds({receiverId:this.id}).subscribe((response)=>{
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
    this.ds.rejectSponsorAd({ adId: this.adId, rejectionCause:this.cause }).subscribe((response) => {
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: response.message });
        this.ds.getSponsorAllAds({receiverId:this.id}).subscribe((response)=>{
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
  }
}
