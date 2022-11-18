import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-donner-manage',
  templateUrl: './donner-manage.component.html',
  styleUrls: ['./donner-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DonnerManageComponent implements OnInit {
  submitting : boolean = true;
  imagepath;
  products;
  product;
  items=[];
  post;
  selectedProducts;
  first:number;
  loading;
  showDialog=false;
  accessOption;
  total: number = 0;
  unapproved: number = 0;

  constructor(private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService, private loader: LoaderService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-fw pi-user', label: ' Doner' }
    ];
    this.accessOption=[{label:'Low',value:0},{label:'Med',value:1},{label:'High',value:2}]
   }

  ngOnInit(): void {
    this.ds.Get_Doner({}).subscribe((response)=>{
      if(response.status==true){
          this.post=response.data.doners;
          this.total = response.data.total;
          this.unapproved = response.data.unapproved;
          console.log(response.data);
      }
    },(err)=>{
      console.log(err)
    })
  }

  newProduct(){}
  showProduct(post){
      // this.products={ ...post } ;
      // this.showDialog = true;
    this.loading = true;
    this.ds.GetDonerSingle(post._id).subscribe((response)=>{
      this.loading = false;
      if(response.status)  {
        this.products = response.data;
        console.log(response.data);
        this.showDialog = true;
      } else {
        this.messageService.add({severity: "error", summary: "Couldn\'t Fetch Details", detail: response.message});
      }
    }, this.handle_error.bind(this) ) 

  }
  
    hideshowDialog() {
      this.showDialog = false;
    }
  
  editProduct(product){}
  deleteBanner(product){}
  //  Start of Enable of Banner
  enable(i,doner) {
    
    setTimeout(() => {
      this.cnfrm.confirm({
        message: 'Are you sure that you want to approve this Donner?',
        header: 'Confirmation',
        acceptButtonStyleClass: 'p-button-success',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loading=true;
          this.load();
          this.ds.DonerApprove({ donerId: i, status: true,doner}).subscribe((response) => {
            this.stopload();
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.loading = true;
              this.ds.Get_Doner({}).subscribe((response) => {  this.loading = false;
                if (response.status == true) {
                  this.loading=false;
                  this.post=response.data.doners;
                }
                else
                  alert(response.message)
              }, this.handle_error.bind(this) )
            }
            else
              alert(response.message)
          })
  
        },
        reject: () => {
        }
      });
  
  
      
    }, 1000);

   
  }

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(i,doner) {

   
    setTimeout(() => {
      this.cnfrm.confirm({
        message: 'Are you sure that you want to reject this Donner?',
        header: 'Confirmation',
        acceptButtonStyleClass: 'p-button-danger',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading=true;
          this.load();
          this.ds.DonerReject({ donerId: i, status: false,doner }).subscribe((response) => {
            this.stopload();
            if (response.status == true)
           
            {
              this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: response.message });
              this.loading = true;
              this.ds.Get_Doner({}).subscribe((response) => { this.loading = false;
                if (response.status == true) {
                  this.loading=false;
                  this.post=response.data.doners;
                }
                else
                  alert(response.message)
              }, this.handle_error.bind(this))
            }
            else
              alert(response.message)
          })
  
        },
        reject: () => {
        }
      });
    }, 1000);
  

  }

  //  End of Disable of Banner


  showDonations(id) {
    this.router.navigate(['/admin-module/donations'], {queryParams: {donerId: id}});
  }

  loadCustomers(event:LazyLoadEvent){
    console.log(event.first)
    console.log(event.rows)
  }
  
  
  handle_error (error){
    if(error instanceof ErrorEvent)  
      this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the client"});
    else 
      this.messageService.add({severity: 'error', summary: "Error", detail: error.status + ": " + error.error.message});
    this.loading = false;
  }

  load() {
    this.loader.start();
    this.submitting = true;
  }

  stopload() {
    this.loader.stop();
    this.submitting = false;
  }

  
  accessChange(event, donerId,doner){
    let access=event.option.value;
    if(isNaN(access)) return alert('Access Level Wrong')
    if(access != 0 && access != 1 && access != 2) return alert('Access Level Is Invalid')
    this.loading=true;
   setTimeout(() => {
     this.loading=true;

     this.ds.change_Doner_Access({access, donerId,doner}).subscribe(async (response)=>{
       if(response.status){
           await this.messageService.add({ severity: 'success', detail: response.message });
            await  this.ds.Get_Doner({}).subscribe((response)=>{
              if(response.status==true){
                this.loading=false;
                  this.post=response.data.receivers;
              }
            },(err)=>{
              this.loading=false;
              console.log(err)
            })

       }else{

       }
     },(err)=>{
       this.loading=false;
     })
     
   }, 1000);
  }


}
