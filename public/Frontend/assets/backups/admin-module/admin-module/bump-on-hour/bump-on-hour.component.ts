import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-bump-on-hour',
  templateUrl: './bump-on-hour.component.html',
  styleUrls: ['./bump-on-hour.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BumpOnHourComponent implements OnInit {

  statusProp;
  data;
  editData;
  items = [];
  product = [];
  selectedProducts;
  products;
  productDialog: boolean;
  submitted;
  uploadedFiles: any[] = [];
  stateOptions;
  post;
  editDialog: boolean;
  showDialog: boolean;
  HourBumpup;
  BumpUpPrice;
  planData = {
    _id: "",
    planName: '',
    status: false,
  }

  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService) {

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-briefcase', label: ' Advertise' },
      { icon: 'pi pi-fw pi-calendar-times', label: " Hour's Bump Up" }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

  }

  ngOnInit(): void {
    this.ds.get_page_1_ad_plan().subscribe((response) => {
      if (response.status) {
        if (response.data && response.data.planName) {
          this.planData.planName = response.data.planName;
          this.planData._id = response.data._id;
          this.planData.status = response.data.status;
          if (response.data.categories && response.data.categories.length > 0)
            this.post = response.data.categories;
        }
      } else {
        console.log(response);
        alert(response.message);
      }
    }, this.error_handle.bind(this));
  }

  // Start Of Add New Baner

  submit() {
    this.submitted = false;
    if (Boolean(this.HourBumpup.trim()) == false || Boolean(this.BumpUpPrice.trim()) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    if (Boolean(this.statusProp) == false) {
      this.statusProp = false;
    }
    const data = { inHours: true, hours: this.HourBumpup, inDays: false, days: 0, price: this.BumpUpPrice, status: this.statusProp, planId: this.planData._id };
    this.ds.add_new_plan_category(data).subscribe((response) => {
      if (response.status) {
        alert(response.message)
        this.ds.get_page_1_ad_plan().subscribe((response) => {
          if (response.status) {
            if (response.data && response.data.planName) {
              this.planData.planName = response.data.planName;
              this.planData._id = response.data._id;
              this.planData.status = response.data.status;
              if (response.data.categories && response.data.categories.length > 0)
                this.post = response.data.categories;
            }
          } else {
            console.log(response);
            alert(response.message);
          }
        }, this.error_handle.bind(this));
      } else {
        console.log(response);
        alert(response.message);
      }
    }, this.error_handle.bind(this))
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

  UpdateBanner() {
    this.submitted = false;
    if (Boolean(this.products.hours) == false || Boolean(this.products.price) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    const data = { inDays: false, days: 0, inHours: true, hours: this.products.hours, price: this.products.price, planId: this.planData._id, categoryId: this.products._id };
    this.ds.update_plan_category(data).subscribe((response) => {
      if (response.status) {
        alert(response.message);
        this.editDialog = false;
        this.ds.get_page_1_ad_plan().subscribe((response) => {
          if (response.status) {
            if (response.data && response.data.planName) {
              this.planData.planName = response.data.planName;
              this.planData._id = response.data._id;
              this.planData.status = response.data.status;
              if (response.data.categories && response.data.categories.length > 0)
                this.post = response.data.categories;
            }
          } else {
            console.log(response);
            alert(response.message);
          }
        }, this.error_handle.bind(this));
      } else {
        console.log(response);
        alert(response.message);
      }
    }, this.error_handle.bind(this));
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
  enable(i) {

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Active this Banner?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.change_plan_status({ planId: this.planData._id, categoryId: this.products._id, status: true }).subscribe((response) => {
          if (response.status == true) {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.editDialog = false;
            this.ds.get_page_1_ad_plan().subscribe((response) => {
              if (response.status) {
                if (response.data && response.data.planName) {
                  this.planData.planName = response.data.planName;
                  this.planData._id = response.data._id;
                  this.planData.status = response.data.status;
                  if (response.data.categories && response.data.categories.length > 0)
                    this.post = response.data.categories;
                }
              } else {
                console.log(response);
                alert(response.message);
              }
            }, this.error_handle.bind(this));
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

  disable(i) {
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Deactive this Banner?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.change_plan_status({ planId: this.planData._id, categoryId: this.products._id, status: false }).subscribe((response) => {
          if (response.status == true) {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            this.editDialog = false;
            this.ds.get_page_1_ad_plan().subscribe((response) => {
              if (response.status) {
                if (response.data && response.data.planName) {
                  this.planData.planName = response.data.planName;
                  this.planData._id = response.data._id;
                  this.planData.status = response.data.status;
                  if (response.data.categories && response.data.categories.length > 0)
                    this.post = response.data.categories;
                }
              } else {
                console.log(response);
                alert(response.message);
              }
            }, this.error_handle.bind(this));
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


  //Start Of Delete Banner

  deleteBanner(product) {
    this.products = { ...product };
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Delete this Banner?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-trash',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.BannerDelete({ planId: this.planData._id, categoryId: this.products._id }).subscribe(async (response) => {
          if (response.status == true) {

            this.post = await response.data;

            this.messageService.add({ severity: 'error', summary: 'Deleted', detail: response.message });
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

  error_handle(error) {
    if (error instanceof ErrorEvent) {
      alert('sorry some client side error occured');
    } else {
      alert(`${error.status} : ${error.error.message}`);
    }
  }

}
