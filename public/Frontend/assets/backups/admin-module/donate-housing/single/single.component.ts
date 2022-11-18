import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SingleComponent implements OnInit {

  items = [];
  id;
  siteDetail;
  selectedProducts;
  first;
  loading;
  adId;
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
    console.log(this.id);
    await this.ds.donated_housings_single(this.id).subscribe(async (response) => {
      if (response.status) {
        this.siteDetail = [response.data];
      }
    }, (err) => {
      console.log(err)
    })

  }

  allot(houseId, adId, receiverId){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to allot house to this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.allot_housing({ houseId: houseId, adId: adId, receiverId }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Alloted', detail: response.message });
            this.siteDetail[0].receiverId = response.data.receiverId;
            this.siteDetail[0].adId = response.data.adId;
            this.siteDetail[0].alloted = true;
          }
          else
            alert(response.message)
        })

      },
      reject: () => {
      }
    });
  }

  rejectAd(adId){
    this.adId=adId;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Ad?',
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

  disableAd(){
    this.ds.rejectReceiverAd({ adId: this.adId,rejectionCauses:this.cause }).subscribe((response) => {
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
        document.getElementById('close').click();
              // this.post=response.data;
        this.siteDetail[0].approved = 2
        this.cause=null;
      }
      else
        alert(response.message)
    })
  }
}
