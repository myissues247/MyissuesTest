import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-edit-receiver',
  templateUrl: './edit-receiver.component.html',
  styleUrls: ['./edit-receiver.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EditReceiverComponent implements OnInit {
  siteDetail;
  id;
  loading;
  selectedProducts;
  constructor(private route: ActivatedRoute, private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ds.GetSpecificUser({ id: this.id }).subscribe(async (response) => {
      if (response.status) {
        const detail = response.data;
        const dob  = new Date(detail.dob);
        detail.dob = (dob.getUTCMonth() + 1) + "-"  + dob.getDate() + "-" + dob.getFullYear();
        if(!(detail.neighbours1 instanceof Object))
          detail.neighbours1 = {};
        if(!(detail.neighbours2 instanceof Object))
          detail.neighbours2 = {}

        this.siteDetail = [detail];

      } else {
        this.messageService.add({ severity: 'error', summary: 'Failed To Fetch', detail: response.message });
      }
    }, this.handle_error.bind(this))
  }

  updateReceiver(form){

    this.cnfrm.confirm({
      message: 'Are you sure that you want to update this Receiver?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-warning',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading=true;
        setTimeout(() => {

          this.ds.updateReceiver({ ...this.siteDetail[0]}).subscribe((response) => {
            this.loading = false;
            if (response.status == true)
            {
              this.messageService.add({ severity: 'success', summary: 'Updated', detail: response.message });
              setTimeout(()=>history.back(), 1000)
            }
            else
              this.messageService.add({severity: 'error', summary: "Failed", detail: response.message});
          })
          
        }, this.handle_error.bind(this));
      },
      reject: () => {
      }
    });

  }


  handle_error(error) {
    if(error instanceof ErrorEvent)
     this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the browser"});
    else 
     this.messageService.add({severity: 'error', summary: "Failed", detail: error.error.message});
    this.loading = false;
  }
  
  goBack() {
    history.back();
  }
}
