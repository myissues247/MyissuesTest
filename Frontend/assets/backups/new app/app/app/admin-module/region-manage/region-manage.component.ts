import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'


@Component({
  selector: 'app-region-manage',
  templateUrl: './region-manage.component.html',
  styleUrls: ['./region-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class RegionManageComponent implements OnInit {
  items;
  post;
  productDialog;
  products;
  stateProp;
  statusProp;
  stateOptions;
  showDialog;
  countryName;
  stateName;
  oldStateName;
  countryId;
  oldStateId;
  submitted;
  editDialog;
  orders;
  constructor(private ds:AdminDataService,private messageService:MessageService,private cnfrm: ConfirmationService) {

     //BreadCrumb

     this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-map-marker', label: ' Location' },
      { icon: 'pi pi-pw pi-map', label: ' Region' }
    ];

    //Status Detail
  
    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

   }

  ngOnInit(): void {

    this.ds.country({}).subscribe((response) => {
      if (response.status == true) {
        this.post = response.data;
      }
      else
        alert(response.message)
    })

  }

//Start of Add New State

  newState(product){
    this.products = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
  }

  submit(product){

    if (Boolean(this.stateProp.trim()) == false ) {
      alert("Please Fill Province Name Fields");
      return true;
    }

    if (Boolean(this.statusProp) == false) {
      this.statusProp = false;
    }
    this.ds.AddState({countryId:product._id,stateName:this.stateProp.trim(),status:this.statusProp}).subscribe((response)=>{
          if(response.status==true){
            this.messageService.add({ severity: 'success', summary: 'Region Added', detail: response.message });
            this.ds.country({}).subscribe((response) => {
              if (response.status == true) {
                this.post = response.data;
                this.productDialog=false;
              }
              else
                alert(response.message)
            })

          }else{

          }
    })
  }

//End of Add New State

//  Start of Enable of Banner
enable(i,p) {
  this.cnfrm.confirm({
    message: 'Are you sure that you want to Active this Region?',
    header: 'Confirmation',
    acceptButtonStyleClass: 'p-button-success',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.ds.RegionStatusEnable({ countryId: p,stateId:i, status: true }).subscribe((response) => {
        if (response.status == true)
        // alert(response.message)
        {
          this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
          this.ds.country({}).subscribe((response) => {
            if (response.status == true) {
              this.post = response.data;
            }
            else
              alert(response.message)
          })
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

disable(i,p) {
  this.cnfrm.confirm({
    message: 'Are you sure that you want to Deactive this Region?',
    header: 'Confirmation',
    acceptButtonStyleClass: 'p-button-danger',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.ds.RegionStatusEnable({ countryId: p,stateId:i, status: false }).subscribe((response) => {
        if (response.status == true)
       
        {
          this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
          this.ds.country({}).subscribe((response) => {
            if (response.status == true) {
              this.post = response.data;
            }
            else
              alert(response.message)
          })
        }
        else
          alert(response.message)
      })

    },
    reject: () => {
    }
  });

}

//  End of Disable of Banner

  // Start of Show  Banner Modal

  showProduct(product,ev) {
    this.products = { ...product };
    this.orders={...ev };
    this.countryName=this.products.countryName;
    this.showDialog = true;
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  // End of Show  Banner Modal

  // Start of Initialize Edit Banner Modal
  editProduct(product,ev) {
    this.products = { ...product };
    this.orders={...ev};
    this.stateName=this.orders.stateName;
    this.oldStateName=this.orders.stateName;
    this.countryId=this.products._id;
    this.oldStateId=this.orders._id;
    this.countryName=this.products.countryName;
    this.editDialog = true;
  }

  hideEditDialog() {
    this.stateName='';
    this.oldStateName='';
    this.countryId='';
    this.oldStateId='';
    this.countryName='';
    this.editDialog = false;
  }


  UpdateBanner() {
    this.submitted = false;
    const formdata = new FormData();

    if (Boolean(this.countryName.trim()) == false || Boolean(this.stateName.trim()) == false ) {
      alert("Please Fill All Fields");
      return true;
    }

    this.ds.RegionUpdate({countryId:this.countryId,stateId:this.oldStateId,stateName:this.stateName,oldStateName:this.oldStateName}).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: response.message });
        //this.editData = '';
        this.ds.country({}).subscribe((response) => {
          if (response.status == true) {
            this.post = response.data;
            this.editDialog = false
          }
          else
            alert(response.message)
        })

      } else {
        alert(response.message)
        //this.editData = '';
        this.editDialog = false
      }

    })

  }

  // End of Initialize Edit Banner Modal

  //Start Of Delete Banner

  deleteBanner(product,ev) {
    this.products = { ...product };
    this.orders={...ev};
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Delete this Region?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-trash',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.StateDelete({ stateName: this.orders.stateName,countryId:this.products._id }).subscribe(async (response) => {
          if (response.status == true) {

            this.post = await response.data;

            this.messageService.add({ severity: 'error', summary: 'Deleted', detail: response.message });
            this.ds.country({}).subscribe((response) => {
              if (response.status == true) {
                this.post = response.data;
              }
              else
                alert(response.message)
            })

          }
          else
            alert(response.message)
        })

      },
      reject: () => {
      }
    });
  }
  // End Of Delete Banner



}
