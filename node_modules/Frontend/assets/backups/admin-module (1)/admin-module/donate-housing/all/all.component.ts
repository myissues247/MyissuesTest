import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AllComponent implements OnInit {
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
  constructor(private route:ActivatedRoute,private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-fw pi-thumbs-up',label: ' Donner'},
      { icon: 'pi pi-fw pi-home', label: ' Donated House' }
    ];
   }

 async ngOnInit() {
    this.id=await this.route.snapshot.paramMap.get('id');
   await  this.ds.donated_housings_all({id:this.id}).subscribe((response)=>{
      if(response.status==true){
          this.post=response.data;
          console.log(this.post);
          
      }
    },(err)=>{
      console.log(err)
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
  }

}
