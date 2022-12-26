import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  providers : [ConfirmationService, MessageService]
})
export class TransactionComponent implements OnInit {
  totalTransactions = 0;
  skip = 0;
  limit= 30;

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
      { label: 'Transactions', icon: 'pi pi-fw pi-money-bill' }
    ];
   }

 async ngOnInit() {
     this.id = await this.route.queryParams.pipe(first()).toPromise().then((data)=>{
       return data.userId;
     })

    //  this.getTransaction();
     this.getTotalTransactions();
  }

  getTransaction() {
    this.loading = true;
    this.ds.get_transactions_all({userId: this.id, skip: this.skip, limit: this.limit}).subscribe((response)=>{
      this.loading = false;
      if(response.status==true){
          this.post=response.data;
      } else {
        this.messageService.add({severity: 'error', summary: "Couldn't Fetch Transactions", detail: response.message});
      }
    }, this.handle_error.bind(this));
  }


  getTotalTransactions() {
    this.ds.get_total_transactions().subscribe((response)=>{
       if(response.status) {
         this.totalTransactions = response.data;
       } else {
         this.totalTransactions = this.post.length;
       }
    }, this.handle_error.bind(this))
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  loadCustomers(event:LazyLoadEvent){
    this.skip = event.first;
    this.limit = event.rows;
    this.getTransaction();
  }


  // Start of Show  Banner Modal

  showProduct(product) {
    // this.products = { ...product };
    // console.log(this.products);
    
    //  this.showDialog = true;
    this.loading = true;
    this.ds.get_transactions_single(product._id).subscribe((response)=>{
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


  
  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getTransaction();
        
      this.loading = true;
      this.ds.bulkSearch_transactions({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.transactions;
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handle_error.bind(this))
    }
  }

  ngOnDestroy() : void {}
}
