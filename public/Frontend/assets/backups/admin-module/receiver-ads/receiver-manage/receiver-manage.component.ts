import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'


@Component({
  selector: 'app-receiver-manage',
  templateUrl: './receiver-manage.component.html',
  styleUrls: ['./receiver-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
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
  accessOption;
  constructor(private ds:AdminDataService,private router:Router, private cnfrm: ConfirmationService, private messageService: MessageService) {

     //BreadCrumb

     this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-pw pi-user', label: ' Receiver' }
    ];

     // Access Option
     this.accessOption=[{label:'Low',value:0},{label:'Med',value:1},{label:'High',value:2}]
   }

  ngOnInit(): void {
    this.ds.GetUser({}).subscribe((response)=>{
      if(response.status==true){
          this.post=response.data.receivers;   
      }
    },(err)=>{
      console.log(err)
    })
  }

  newProduct(){}
  editProduct(product){}
  deleteBanner(product){}
  enable(receiverId,receiver){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Receiver ?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {

          this.ds.approveReceiver({receiverId,receiver }).subscribe((response) => {
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.ds.GetUser({}).subscribe((response)=>{
                if(response.status==true){
                  this.loading=false;
                    this.post=response.data.receivers;
                }
              },(err)=>{
                this.loading=false;
                console.log(err)
              })
            }
            else
              alert(response.message)
          })
          
        }, 1000);
       

      },
      reject: () => {
      }
    });

  }
  disable(receiverId,receiver){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Receiver ?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {
          this.ds.rejectReceiver({receiverId,receiver }).subscribe((response) => {
            if (response.status == true)
           
            {
              this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
              this.ds.GetUser({}).subscribe((response)=>{
                if(response.status==true){
                  this.loading=false;
                    this.post=response.data.receivers;
                }
              },(err)=>{
                this.loading=false;
                console.log(err)
              })
            }
            else
              alert(response.message)
          })
  
        }, 1000);
        
      },
      reject: () => {
      }
    });

  }

  loadCustomers(event:LazyLoadEvent){
    console.log(event.first)
    console.log(event.rows)
  }

  accessChange(event,receiverId,receiver){
    let access=event.option.value;
    this.loading=true;
    if(isNaN(access)) return alert('Access Level Wrong')
    if(access != 0 && access != 1 && access != 2) return alert('Access Level Is Invalid')

   setTimeout(() => {
     this.loading=true;

     this.ds.change_Receiver_Access({access,receiverId,receiver}).subscribe(async (response)=>{
       if(response.status){
           await this.messageService.add({ severity: 'success', detail: response.message });
            await  this.ds.GetUser({}).subscribe((response)=>{
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
