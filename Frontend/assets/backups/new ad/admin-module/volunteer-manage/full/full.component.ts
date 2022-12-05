import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class FullComponent implements OnInit {


  items = [];
  id;
  siteDetail;
  selectedProducts;
  first;
  loading;
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
      }
    }, (err) => {
      console.log(err)
    })

  }

  enable(AgencyId){
    console.log(AgencyId)
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Agency?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {

          this.ds.approveAgency({AgencyId }).subscribe((response) => {
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.siteDetail[0].status = 1;
              this.siteDetail[0].verificationStatus = 2;
              this.siteDetail[0].access = 2;
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
  disable(agencyId){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Agency?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {
          this.ds.rejectAgency({agencyId }).subscribe((response) => {
            if (response.status == true)
           
            {
              this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
              this.siteDetail[0].status = 2; //2 means rejected;
              this.siteDetail[0].verificationStatus = 0;
              this.siteDetail[0].access = 1;
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

  


}
