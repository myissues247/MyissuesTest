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
  totalRecords = 0;
  skip =0;
  limit = 0;

  donerId;
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
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-fw pi-thumbs-up',label: ' Donner'},
      { icon: 'pi pi-fw pi-dollar', label: ' Donations'}
    ];
   }

 async ngOnInit() {
    
     this.donerId= await this.route.queryParams.pipe(first()).toPromise().then((data)=>{
       return data.donerId
     })
      
     this.getDonations(true);
  }

  getDonations(withTotal) {
    this.loading = true;
    this.ds.getDonations({donerId:this.donerId, withTotal, skip:this.skip, limit: this.limit}).subscribe((response)=>{
      this.loading = false;
      if(response.status==true){
         // this.post = response.data.donations;
          this.totalRecords = response.data.total || 0;
      } else {
        this.messageService.add({severity: 'error', summary: "Couldn't Fetch Donations", detail: response.message});
      }
    }, this.handle_error.bind(this))
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  loadDonation(event:LazyLoadEvent){
    setTimeout(() => {
      this.loading = true;

      this.ds.getDonations({donerId:this.donerId, withTotal:true, skip: event.first, limit: event.rows}).subscribe((response)=>{
        this.loading = false;
        if(response.status==true){
            this.post = response.data.donations;
          //  this.totalRecords = response.data.total || 0;
        } else {
          this.messageService.add({severity: 'error', summary: "Couldn't Fetch Donations", detail: response.message});
        }
      }, this.handle_error.bind(this))

    }, 1000);
  }


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

   handle_error (error){
    if(error instanceof ErrorEvent)  
      this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the client"});
    else 
      this.messageService.add({severity: 'error', summary: "Error", detail: error.status + ": " + error.error.message});
    this.loading = false;
  }

  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getDonations(false);
        
      this.loading = true;
      this.ds.bulkSearch_donations({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.donations;
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handle_error.bind(this))
    }
  }

  ngOnDestroy() : void {}
}
