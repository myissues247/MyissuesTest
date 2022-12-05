import { Component, OnInit, ViewChild } from '@angular/core';
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
  totalReceivers = 0;
  first:number=0;
  last:number=0;
  skip = 0;
  limit = 30;

  imagepath;
  products;
  product;
  items=[];
  post;
  selectedProducts;
  loading;
  accessOption;
  
  selectedAccess
  cause;
  receiver;
  receiverId;
  constructor(private ds:AdminDataService,private router:Router, private cnfrm: ConfirmationService, private messageService: MessageService) {

     //BreadCrumb

     this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-pw pi-user', label: ' Receiver' },
      { icon: 'pi pi-pw pi-user', label: ' Manage' }
    ];

     // Access Option
     this.accessOption=[{label:'Low',value:0},{label:'Med',value:1},{label:'High',value:2}]
   }

  ngOnInit(): void {
     this.getReceivers(true);
  }

  getReceivers(withTotal) {
    this.loading = true;
    this.ds.GetUser({withTotal}).subscribe((response)=>{
      this.loading = false;
      if(response.status==true){
          this.post=response.data.receivers;   
          this.totalReceivers = response.data.total
      } else {
          this.messageService.add({ severity: 'error', summary: 'Couldn\'t Fetch Receivers', detail: response.message });
      }
    }, this.handle_error.bind(this))
  }

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
              this.ds.GetUser({skip:this.skip, limit:this.limit}).subscribe((response)=>{
                if(response.status==true){
                  this.loading=false;
                    this.post=response.data.receivers;
                }
              },this.handle_error.bind(this))
            }
            else
              alert(response.message)
          }, this.handle_error.bind(this))
          
        }, 100);
      },
      reject: () => {
      }
    });
  }
  disable(receiverId, receiver, causeButton){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Receiver ?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.receiver = receiver;
        this.receiverId = receiverId;
        document.getElementById('click2').click();
      },
      reject: () => {
      }
    });

  }

  disableReceiver() {
    this.loading=true;
    setTimeout(() => {
      this.ds.rejectReceiver({receiverId: this.receiverId, receiver: this.receiver, cause: this.cause }).subscribe((response) => {
        if (response.status == true)
        {
          this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: response.message });
          this.ds.GetUser({skip:this.skip, limit:this.limit}).subscribe((response)=>{
            this.loading=false;
            if(response.status==true){
              document.getElementById('close').click();
              this.post=response.data.receivers;
              this.cause=null;
            }
          },this.handle_error.bind(this))
        }
        else
          alert(response.message)
      }, this.handle_error.bind(this))

    }, 100);
  }

  loadReceiverManage(event:LazyLoadEvent){
    setTimeout(() => {
      this.loading = true;
      this.ds.GetUser({withTotal:true,skip: event.first, limit: event.rows }).subscribe((response)=>{
        this.loading = false;
        if(response.status==true){
            this.post=response.data.receivers;   
           // this.totalReceivers = response.data.total
        } else {
            this.messageService.add({ severity: 'error', summary: 'Couldn\'t Fetch Receivers', detail: response.message });
        }
      }, this.handle_error.bind(this))

    }, 1000);

  
  }


  accessChange(event,receiverId,receiver){
    this.receiverId = receiverId;
    this.receiver = receiver;
    this.selectedAccess = event.option.value;
    if(this.selectedAccess == 2)
      this.accessChangeHandler();
    else 
     document.getElementById('click3').click();
  }

  accessChangeHandler() {
    let access=this.selectedAccess;
    this.loading=true;
    if(isNaN(access)) return alert('Access Level Wrong')
    if(access != 0 && access != 1 && access != 2) return alert('Access Level Is Invalid')

   setTimeout(() => {
     this.loading=true;

     this.ds.change_Receiver_Access({access, cause: this.cause, receiverId: this.receiverId, receiver: this.receiver}).subscribe(async (response)=>{
       if(response.status){
           await this.messageService.add({ severity: 'success', detail: response.message });
            await  this.ds.GetUser({skip:this.skip, limit:this.limit}).subscribe((response)=>{
              this.loading=false;
              if(response.status==true){
                this.post=response.data.receivers;
                this.cause = null;
                document.getElementById('close1').click();
              }
            },this.handle_error.bind(this))

       }else{
        this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
       }
     },this.handle_error.bind(this))
     
   }, 10);
  }

  search(event) {
    const code = event.keyCode ? event.keyCode : event.which;
    if(code == 13) {
      if(!event.target.value) {
        return this.getReceivers(false);
      }
      this.loading = true;
      this.ds.bulkSearch_receiver({searchItem: event.target.value}).subscribe((response)=>{
        this.loading = false;
        if(response.status) {
          this.post=response.data.receivers;
          console.log(response.data);
        } else {
          this.messageService.add({severity: 'error', summary: "Failed To Fetch", detail: response.message});
        }
      }, this.handle_error.bind(this))
    }
  }

  handle_error(error) {
    if(error instanceof ErrorEvent)
     this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the browser"});
   else 
     this.messageService.add({severity: 'error', summary: "Failed", detail: error.error.message});
     this.loading = false;
  }
}
