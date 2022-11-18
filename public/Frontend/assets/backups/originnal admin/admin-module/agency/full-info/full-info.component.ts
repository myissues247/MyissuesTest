import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-full-info',
  templateUrl: './full-info.component.html',
  styleUrls: ['./full-info.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class FullInfoComponent implements OnInit {

  items = [];
  id;
  siteDetail;
  selectedProducts;
  first;
  loading;

  cause
  constructor(private route: ActivatedRoute, private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-pw pi-user', label: ' Receiver' }
    ]
  }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id');
    await this.ds.getAgencyFullData({ id: this.id }).subscribe(async (response) => {
      if (response.status) {
        this.siteDetail = [response.data];
        console.log(response.data);
      } else {
        alert(response.message);
      }
    }, this.handler_error.bind(this))

  }

  enable(agencyId){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Agency?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {

          this.ds.approveAgency({agencyId, agency: this.siteDetail[0] }).subscribe((response) => {
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.siteDetail[0].status = 1;
              this.siteDetail[0].verificationStatus = 2;
              this.siteDetail[0].access = 2;
            }
            else
              alert(response.message)
          }, this.handler_error.bind(this))
          
        }, 0);
       

      },
      reject: () => {
      }
    });

  }
  disable(agencyId){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Agency?',
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
      this.ds.rejectAgency({agencyId: this.siteDetail[0]._id, agency: this.siteDetail[0], cause:this.cause }).subscribe((response) => {
        if (response.status == true)
       
        {
          this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
          this.cause = null;
          document.getElementById('close').click();
          this.siteDetail[0].status = 0; //2 means rejected; 
          this.siteDetail[0].verificationStatus = 0;
          this.siteDetail[0].access = 1;
        }
        else
          alert(response.message)
      }, this.handler_error.bind(this))

    }, 1);
    
  }
 
  handler_error(error) {
    if(error instanceof ErrorEvent) 
      this.messageService.add({severity: "error", summary: "Error Occured", detail: "Sorry some error occured on the browser"});
    else 
      this.messageService.add({severity: "error", summary: "Error", detail: error.error.message});
  }
  

}
