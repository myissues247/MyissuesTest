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
  await this.ds.getSingleAd(this.id).subscribe(async (response) => {
    if (response.status) {
      this.siteDetail = [response.data];
      console.log(this.siteDetail);
    }
  }, (err) => {
    console.log(err)
  }) 

}

approveAd(adId){
  this.cnfrm.confirm({
    message: 'Are you sure that you want to Approve this Ad?',
    header: 'Confirmation',
    acceptButtonStyleClass: 'p-button-success',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.ds.approveAgencyAd({ adId: adId }).subscribe((response) => {
        if (response.status == true)
        {
          this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
          this.siteDetail[0].approved = 2;
          this.siteDetail[0].status = true;
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
  this.ds.rejectAgencyAd({ adId: this.adId,rejectionCauses:this.cause }).subscribe((response) => {
    if (response.status == true)
    {
      this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
      document.getElementById('close').click();
            // this.post=response.data;
      this.siteDetail[0].approved = 1;
      this.siteDetail[0].status = false;
      this.cause=null;
    }
    else
      alert(response.message)
  })
}


enable(ev){
  this.cnfrm.confirm({
    message: 'Are you sure that you want to show this Ad?',
    header: 'Confirmation',
    acceptButtonStyleClass: 'p-button-success',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.ds.updateAgencyAd({ adId: ev, status: true }).subscribe((response) => {
        if (response.status == true)
        {
          this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
          this.siteDetail[0].status = true;
        }
        else
          alert(response.message)
      })

    },
    reject: () => {
    }
  });
}
disable(ev){
  this.cnfrm.confirm({
    message: 'Are you sure that you want to Deactive this Ad?',
    header: 'Confirmation',
    acceptButtonStyleClass: 'p-button-danger',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.ds.updateAgencyAd({ adId: ev, status: false }).subscribe((response) => {
        if (response.status == true)
        {
          this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
          this.siteDetail[0].status = false;
        }
        else
          alert(response.message)
      })

    },
    reject: () => {
    }
  });
}


}
