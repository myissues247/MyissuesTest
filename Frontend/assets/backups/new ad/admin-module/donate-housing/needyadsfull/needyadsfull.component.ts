import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-needyadsfull',
  templateUrl: './needyadsfull.component.html',
  styleUrls: ['./needyadsfull.component.css'],
  providers : [ConfirmationService, MessageService]
})
export class NeedyadsfullComponent implements OnInit {


  items = [];
  id;
  houseId;
  siteDetail;
  selectedProducts;
  first;
  loading;
  adId;
  cause;
  constructor(private route: ActivatedRoute, private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService, private router: Router) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { icon: 'pi pi-pw pi-user', label: ' Receiver' },
      { icon: 'pi pi-pw pi-user', label: ' Manage' },
      { icon: 'pi pi-pw pi-book', label: ' Ads Detail' }
    ]
  }

  async ngOnInit() {
    this.id = await this.route.snapshot.paramMap.get('id');
    this.houseId = await this.route.snapshot.paramMap.get('houseId')

    await this.ds.getSingleAdData(this.id).subscribe(async (response) => {
      if (response.status) {
        this.siteDetail = [response.data];
      } else {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: response.message});
      }
    }, this.handle_error.bind(this))

  }

  allot(){
    this.cnfrm.confirm({
      message: 'Are you sure that you want to allot house to this Ad?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.allot_housing({ houseId: this.houseId, adId: this.siteDetail[0]._id, receiverId: this.siteDetail[0].receiverId, ownerType: this.siteDetail[0].ownerType }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Alloted', detail: response.message });
            this.siteDetail[0].donations.donatedHousings = this.houseId;
            setTimeout(()=>this.router.navigate(['/admin-module/donated-housings/all']), 1000)
          }
          else
          this.messageService.add({severity: 'error', summary: 'Failed', detail: response.message});
        }, this.handle_error.bind(this))

      },
      reject: () => {
      }
    });
  }
  
  
  handle_error(error) {
    if(error instanceof Error) 
      this.messageService.add({severity: 'error', summary: 'Unknown Error Occured', detail: "Sorry some unknown Error occured on the browser"});
    else 
      this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message});
      
  }

  


}
