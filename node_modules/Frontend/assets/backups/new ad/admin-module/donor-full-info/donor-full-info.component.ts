import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-donor-full-info',
  templateUrl: './donor-full-info.component.html',
  styleUrls: ['./donor-full-info.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DonorFullInfoComponent implements OnInit {
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
    await this.ds.GetDonerSingle({ id: this.id }).subscribe(async (response) => {
      if (response.status) {
        this.siteDetail = [response.data];
      }
    }, this.handle_error.bind(this))

  }

  enable(donerId,doner){
alert( JSON.stringify(doner))
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Donor ?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {

          this.ds.DonerApprove({donerId,doner }).subscribe((response) => {
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.siteDetail[0].status = 1;
            }
            else
              alert(response.message)
          }, this.handle_error.bind(this))
          
        }, 0);
       

      },
      reject: () => {
      }
    });

  }

  
  disable(donerId,doner){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Donor ?',
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
      this.ds.DonerReject({donerId: this.siteDetail[0]._id, doner:this.siteDetail[0], cause: this.cause }).subscribe((response) => {
        if (response.status == true)
       
        {
          this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
          this.siteDetail[0].status = 0
          this.cause  = null
          document.getElementById('close').click()
        }
        else
          alert(response.message)
      }, this.handle_error.bind(this))

    }, 0);
  }

  

  handle_error(error) {
    if(error instanceof ErrorEvent)
     this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the browser"});
   else 
     this.messageService.add({severity: 'error', summary: "Failed", detail: error.error.message});
  }

}
