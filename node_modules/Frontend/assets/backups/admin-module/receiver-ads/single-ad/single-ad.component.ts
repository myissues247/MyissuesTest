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
    }, (err) => {
      console.log(err)
    })

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

          this.ds.approveReceiver({receiverId }).subscribe((response) => {
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
              this.siteDetail[0].approved = 2;
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
  disable(receiverId){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Receiver ?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {
          this.ds.rejectReceiver({receiverId }).subscribe((response) => {
            if (response.status == true)
           
            {
              this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
              this.siteDetail[0].approved = 1;
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
