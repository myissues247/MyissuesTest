import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-bump',
  templateUrl: './bump.component.html',
  styleUrls: ['./bump.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BumpComponent implements OnInit {

  statusProp;
  data;
  editData;
  items = [];
  product;
  selectedProducts;
  products;
  productDialog: boolean;
  submitted;
  uploadedFiles: any[] = [];
  stateOptions;
  post;
  editDialog: boolean;
  showDialog: boolean;
  BumpupCount;
  BumpUpPrice;
  loading;
  totalRecords;

  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService) {
    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-briefcase', label: ' Advertise' },
      { icon: 'pi pi-fw pi-map', label: ' Bump Up' }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];
  }

  ngOnInit(): void {

    this.ds.getAllBumpUpCount({}).subscribe((response) => {
      if (response.status == true) {
        this.post = response.data;
        this.totalRecords=response.data.length
      }
      else
        alert(response.message)
    })
  }

  // Start Of Add New Baner

  submit() {
    // this.loading=true; 
    this.submitted = false;
    if (Boolean(this.BumpupCount) == false || Boolean(this.BumpUpPrice) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    if (Boolean(this.statusProp) == false) {
      this.statusProp = false;
    }

    if (isNaN(this.BumpupCount)) return alert('Count Must be No. Only')
    if (isNaN(this.BumpUpPrice)) return alert('Price Must be No. Only')

    this.ds.createNewBumpUpCount({ count: this.BumpupCount, price: this.BumpUpPrice, status: this.statusProp }).subscribe(async (response) => {
      if (response.status) {
        this.messageService.add({ severity: 'success', summary: 'Bump Up Added', detail: response.message });
          this.productDialog=false;
          this.ds.getAllBumpUpCount({}).subscribe((response) => {
            if (response.status == true) {
              this.post = response.data;
            }
            else
              alert(response.message)
          })

      }
    }, (err) => {

    })
  }


  // End Of Add New Baner


  // Start of Initialize Add New Banner Modal
  newProduct() {
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
  }

  // End  of Initialize Add New Banner Modal



  // Start of Initialize Edit Banner Modal
  editProduct(product) {
    this.products = { ...product };
    this.editDialog = true;
  }

  hideEditDialog() {
    this.editDialog = false;
  }

  editselectimage(ev) {
    if (ev.length > 0) {

      const file = ev[0];
      this.editData = file;
      //console.log(this.data)
    }
  }

  UpdateBumpUPCount(bumpId) {
    this.submitted = false;

    if (Boolean(this.products.count) == false || Boolean(this.products.price) == false || Boolean(bumpId) == false) {
      alert("Please Fill All Fields");
      return true;
    }
    if (isNaN(this.products.price)) return alert('Price Must be No. Only')
    if (isNaN(this.products.count)) return alert('Count Must be No. Only')

    this.ds.updateBumpUpCount({ bumpId, count: this.products.count, price: this.products.price }).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: response.message });
        this.editData = '';
        this.ds.getAllBumpUpCount({}).subscribe((response) => {
          if (response.status == true) {
            this.post = response.data;
            this.editDialog = false
          }
          else
            alert(response.message)
        })

      } else {
        alert(response.message)
        this.editData = '';
        this.editDialog = false
      }

    })

  }

  // End of Initialize Edit Banner Modal

  // Start of Show  Banner Modal

  showProduct(product) {
    this.products = { ...product };

    this.showDialog = true;
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  // End of Show  Banner Modal


  //  Start of Enable of Banner
  enable(bumpId) {

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Active this Banner?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true;
        setTimeout(() => {
          this.loading = true;
          this.ds.updateBumpUpCountStatus({ bumpId ,status:true}).subscribe(async (response) => {
            if (response.status == true) {
              this.messageService.add({ severity: 'success', summary: 'Enabled', detail: response.message });
              this.ds.getAllBumpUpCount({}).subscribe((response) => {
                if (response.status == true) {
                  this.loading=false;
                  this.post = response.data;
                }
                else{
                  this.loading=false;
                  alert(response.message)
                }
              })
  
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

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(bumpId) {
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Deactive this Banner?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        setTimeout(() => {
          this.loading = true;
          this.ds.updateBumpUpCountStatus({ bumpId ,status:false}).subscribe(async (response) => {
            if (response.status == true) {
              this.messageService.add({ severity: 'error', summary: 'Disabled', detail: response.message });
              this.ds.getAllBumpUpCount({}).subscribe((response) => {
                if (response.status) {
                  this.loading=false;
                  this.post = response.data;
                }
                else{
                  this.loading=false;
                  alert(response.message)
                }
               
              })
  
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

  //  End of Disable of Banner


  //Start Of Delete Banner

  deleteBanner(bumpId) {
    // this.products = { ...product };
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Delete this Banner?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-trash',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        setTimeout(() => {
          this.loading = true;
          this.ds.deleteBumpUpCount({ bumpId }).subscribe(async (response) => {
            if (response.status == true) {
              this.messageService.add({ severity: 'error', summary: 'Deleted', detail: response.message });
              this.ds.getAllBumpUpCount({}).subscribe((response) => {
                if (response.status == true) {
                  this.loading=false;
                  this.post = response.data;
                }
                else{
                  this.loading=false;
                  alert(response.message)
                }
              
              })
  
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
  // End Of Delete Banner


}
