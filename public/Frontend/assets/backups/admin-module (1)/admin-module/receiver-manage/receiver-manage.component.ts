import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-receiver-manage',
  templateUrl: './receiver-manage.component.html',
  styleUrls: ['./receiver-manage.component.scss']
})
export class ReceiverManageComponent implements OnInit {
  imagepath;
  products;
  product;
  items=[];
  post;
  selectedProducts;
  first:number;
  loading;
  constructor(private ds:AdminDataService,private router:Router) {

     //BreadCrumb

     this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-pw pi-user', label: ' Receiver' }
    ];
   }

  ngOnInit(): void {
    this.ds.GetUser({}).subscribe((response)=>{
      if(response.status==true){
          this.post=response.data.receivers;
          console.log(this.post)
      }
    },(err)=>{
      console.log(err)
    })
  }

  newProduct(){}
  showProduct(post){
    //alert(JSON.stringify(this.products))
      this.router.navigate(['/admin-module/receiverdetail'],{queryParams:{id:post._id}})
  }

  showAds(id) {
    this.router.navigate(['/admin-module/receiver-ads'], {queryParams : {userId: id}})
  }
  editProduct(product){}
  deleteBanner(product){}
  enable(ev){}
  disable(ev){}

  loadCustomers(event:LazyLoadEvent){
    console.log(event.first)
    console.log(event.rows)
  }
}
