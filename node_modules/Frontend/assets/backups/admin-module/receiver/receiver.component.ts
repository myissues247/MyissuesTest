import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ReceiverComponent implements OnInit {
  submitting : boolean = true;
  imagepath;
  products;
  product;

  post;
  selectedProducts;
  first:number;
  loading;
  showDialog=false;
  items=[];
  id;
  siteDetail;

  constructor(private route: ActivatedRoute,private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService, private loader: LoaderService) { 

      this.items=[
        { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
        { icon: 'pi pi-pw pi-user', label: ' User' },
        { icon: 'pi pi-pw pi-user', label: ' Receiver' }
      ]
  }

  async ngOnInit() {
    await this.route.queryParamMap.subscribe(async (d)=>{
        this.id=await d.get('id');
    })

    await this.ds.GetSpecificUser({id:this.id}).subscribe(async (response)=>{
            if(response.status==true){
              this.siteDetail=[response.data];
              console.log(response.data)
            }
    },(err)=>{
        console.log(err)
    })
  }

  enable(i) {

    this.cnfrm.confirm({
      message: 'Are you sure that you want to approve this Receiver?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.load();
        this.ds.DonerApprove({ donerId: i, status: true}).subscribe((response) => {
          this.stopload();
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
            this.loading = true;
            this.ds.Get_Doner({}).subscribe((response) => {  this.loading = false;
              if (response.status == true) {
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


  }

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(i) {
    this.cnfrm.confirm({
      message: 'Are you sure that you want to reject this Receiver?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.load();
        this.ds.DonerReject({ donerId: i, status: false }).subscribe((response) => {
          this.stopload();
          if (response.status == true)
         
          {
            this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: response.message });
            this.loading = true;
            this.ds.Get_Doner({}).subscribe((response) => { this.loading = false;
              if (response.status == true) {
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

}


