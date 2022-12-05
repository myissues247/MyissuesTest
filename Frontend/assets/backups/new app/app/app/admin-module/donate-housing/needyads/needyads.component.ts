import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-needyads',
  templateUrl: './needyads.component.html',
  styleUrls: ['./needyads.component.scss'],
    providers : [ConfirmationService, MessageService]
})
export class NeedyadsComponent implements OnInit {

  totalAds =0;
  skip = 0;
  limit = 30;
  
  id ;
  houseId;
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
    this.houseId = await this.route.snapshot.paramMap.get('houseId');
    // this.getAds(true);
  }

  getAds(withTotal) {
    this.loading = true;
    this.ds.getDonatedHousingAds({withTotal, skip: this.skip, limit: this.limit}).subscribe((response)=>{
      this.loading = false;
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
  loadCustomers(event:LazyLoadEvent){
    this.skip = event.first;
    this.limit = event.rows;
    this.getAds(!this.totalAds);
  }

  showProduct(post){
    this.products={ ...post };
    this.router.navigate(['/admin-module/receiverdetail'],{queryParams:{id:this.products[0]._id}})
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
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handler_error.bind(this))
    }
  }


  
  allot(adId, receiverId, ownerType, houseId){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to allot house to this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.allot_housing({ houseId: houseId, adId: adId, receiverId, ownerType}).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Alloted', detail: response.message });
            this.router.navigate(['/admin-module/donated-housings/all'])
          }
          else
          this.messageService.add({severity: 'error', summary: 'Failed', detail: response.message});
        }, this.handler_error.bind(this))

      },
      reject: () => {
      }
    });
  }

}
