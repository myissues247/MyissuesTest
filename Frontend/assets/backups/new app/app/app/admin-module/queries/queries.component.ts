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
  totalRecords = 0;
  skip = 0;
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
      { icon: 'pi pi-pw pi-cog', label: ' Additional Setting' },
      { icon: 'pi pi-pw pi-comments', label: ' Queries' }
    ];
   }

  ngOnInit() {
    // this.id=await this.route.snapshot.paramMap.get('id');
    // this.getQueries(true);
  }

  getQueries(withTotal) {
    this.loading = true;
    this.ds.get_queries({withTotal, skip: this.skip, limit: this.limit}).subscribe((response)=>{
      this.loading = false;
      if(response.status==true){
          this.post=response.data.queries;
          this.totalRecords = response.data.total || this.totalRecords;
          console.log(response.message); 
      } else {
        this.messageService.add({severity: 'error', summary: "Couldn't Fetch Queries", detail: response.message})
      }
    }, this.handle_error.bind(this));
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  loadCustomers(event:LazyLoadEvent){
    // console.log(event.first)
    // console.log(event.rows)
    this.skip = event.first;
    this.limit = event.rows;
    this.getQueries(!this.totalRecords);
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

  
  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getQueries(false);
        
      this.loading = true;
      this.ds.bulkSearch_queries({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          console.log(response);
          this.post=response.data.queries;
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
         this.messageService.add({severity: "error", summary: "Failed", detail: error.error.message});
      this.loading = false
  }

}
