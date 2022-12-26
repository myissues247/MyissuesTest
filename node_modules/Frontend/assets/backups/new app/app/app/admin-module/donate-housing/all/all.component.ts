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
  totalRecords = 0;
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
  constructor(private route:ActivatedRoute, private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-fw pi-thumbs-up',label: ' Donner'},
      { icon: 'pi pi-fw pi-home', label: ' Donated House' }
    ];
   }

 async ngOnInit() {
    this.id=await this.route.snapshot.paramMap.get('id');
    // this.getDonatedHousing(true)
  }
  
  getDonatedHousing(withTotal) {
    this.loading = true;
    this.ds.donated_housings_all({id:this.id, withTotal, skip: this.skip, limit: this.limit}).subscribe((response)=>{ this.loading = false;
      if(response.status==true){
          this.post=response.data.donatedHousings;
          this.totalRecords = response.data.total || this.totalRecords;
          console.log(this.post);
      } else {
        this.messageService.add({severity: 'error', summary: "Couldn't Fetch Housings", detail: response.message})
      }
    }, this.handle_error.bind(this));
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  loadCustomers(event) {
    this.skip = event.first;
    this.limit = event.rows;
    this.getDonatedHousing(!this.totalRecords);
  }

  showProduct(post){
    this.products={ ...post };
      this.router.navigate(['/admin-module/receiverdetail'],{queryParams:{id:this.products[0]._id}})
  }

  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) 
        return this.getDonatedHousing(false);
        
      this.loading = true;
      this.ds.bulkSearch_donatedHousing({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.donatedHousings;
          this.totalRecords = response.data.total || this.totalRecords
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handle_error.bind(this))
    }
  }
   
    
  handle_error(error){
    if(error instanceof ErrorEvent) 
      this.messageService.add({severity: "error", summary: "Error Occured", detail: "Sorry some error occured on the browser"});
    else
      this.messageService.add({severity: "error", summary: "Error", detail : error.error.message});
    this.loading = false;
  }

}
