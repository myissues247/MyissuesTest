import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'
@Component({
  selector: 'app-single-ad',
  templateUrl: './single-ad.component.html',
  styleUrls: ['./single-ad.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SingleAdComponent implements OnInit {
  items = [];
  id;
  siteDetail;
  selectedProducts;
  first;
  loading;

  cause;
  constructor(private route: ActivatedRoute, private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-pw pi-user', label: ' Receiver' }
    ]
  }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id');
    await this.ds.GetSpecificUser({ id: this.id }).subscribe(async (response) => {
      if (response.status) {
        this.siteDetail = [response.data];
      }
    }, this.handle_error.bind(this))

  }

  enable(receiverId){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Receiver ?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {

          this.ds.approveReceiver({receiverId, receiver: this.siteDetail[0]}).subscribe((response) => {
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.siteDetail[0].status = 1;
            }
            else
              alert(response.message)
          })
          
        }, this.handle_error.bind(this));
       

      },
      reject: () => {
      }
    });

  }
  disable(receiverId){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Receiver ?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        document.getElementById('click2').click();
        
      },
      reject: () => {
      }
    });

  }
 

  disableHandler() {
    
    this.loading=true;
        setTimeout(() => {
          this.ds.rejectReceiver({receiverId:this.siteDetail[0]._id, receiver: this.siteDetail[0], cause: this.cause }).subscribe((response) => {
            if (response.status == true)
           
            {
              this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
              this.siteDetail[0].status= 0;
              this.cause  = null
              document.getElementById('close').click();
            }
            else
              alert(response.message)
          }, this.handle_error.bind(this))
  
        }, 1);
  }
  
  handle_error(error) {
    if(error instanceof ErrorEvent)
     this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the browser"});
   else 
   this.messageService.add({severity: 'error', summary: "Failed", detail: error.error.message});
  }

}
