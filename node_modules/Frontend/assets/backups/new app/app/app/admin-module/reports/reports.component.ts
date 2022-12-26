import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ReportsComponent implements OnInit {
  totalRecords = 0;
  skip= 0;
  limit= 30;

  id ;
  imagepath;
  products : any = {};
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
      { icon: 'pi pi-pw pi-cog', label: ' Additional Setting' },
      { icon: 'pi pi-pw pi-flag', label: ' Reports' }
    ];
   }

 async ngOnInit() {
   this.id=await this.route.snapshot.paramMap.get('id');
  //  this.getReports(true);
 }

 getReports(withTotal) {
   this.loading = true;
  this.ds.get_reports({withTotal, skip: this.skip, limit: this.limit, adId: this.id}).subscribe((response)=>{
    this.loading = false;
    if(response.status==true){
        this.post=response.data.reports;
        this.totalRecords = response.data.total || this.totalRecords;
    } else {
      this.messageService.add({severity: "error", summary: "Couldn't Fetch Reports", detail: response.message});
    }
   }, this.handle_error.bind(this))
 }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  loadCustomers(event:LazyLoadEvent){
    // console.log(event.first)
    // console.log(event.rows)
    this.skip = event.first;
    this.limit = event.rows;
    this.getReports(!this.totalRecords)
  }


  // Start of Show  Banner Modal

  showProduct(product) {
    this.products = { ...product };
    this.showDialog = true;
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  take_to_ad() {
    const ownerType = this.products.ownerType; 
    if(ownerType == 'agency')
      this.router.navigate(["/admin-module/agency/ad/", this.products.adId]);
    else if(ownerType == 'sponsor')
      this.router.navigate(["/admin-module/sponsor/ad/", this.products.adId]);
    else
      this.router.navigate(["/admin-module/receiver-ads/full/", this.products.adId])
  }
 
  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getReports(false);
        
      this.loading = true;
      this.ds.bulkSearch_reports({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          console.log(response);
          this.post=response.data.reports;
          this.totalRecords = response.data.total || this.totalRecords;
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handle_error.bind(this))
    }
  }

  handle_error(error){
      if(error instanceof ErrorEvent) 
         this.messageService.add({severity: "error", summary: "Error" , detail: "Sorry some error occured on the client"});
      else 
         this.messageService.add({severity: "error", summary: "Faild", detail: error.error.message});
      this.loading = false;
  }

}
