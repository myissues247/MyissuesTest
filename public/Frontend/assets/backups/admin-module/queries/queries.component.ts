import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class QueriesComponent implements OnInit {

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
  skip= 0;
  limit= 30;
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
   await  this.ds.get_queries({skip: this.skip, limit: this.limit}).subscribe((response)=>{
      if(response.status==true){
          this.post=response.data;
          console.log(response.message);
          
          console.log(this.post);
          
      }
    },(err)=>{
      console.log(err)
    })
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  loadCustomers(event:LazyLoadEvent){
    // console.log(event.first)
    // console.log(event.rows)
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

}
