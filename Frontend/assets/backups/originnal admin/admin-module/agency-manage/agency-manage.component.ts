import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-agency-manage',
  templateUrl: './agency-manage.component.html',
  styleUrls: ['./agency-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AgencyManageComponent implements OnInit {
  imagepath = 'http://localhost:8000/';
  //imagepath = 'http://18.223.136.68/';
  titleProp;
  descProp;
  imageProp;
  sequenceProp;
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
  fileUpload: FileUpload
  post;
  editDialog: boolean;
  showDialog: boolean;
  cityProp;
  categoryProp;

  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService) {

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { label: 'Agency', icon: 'pi pi-fw pi-sitemap' },
      { label: 'Agency', icon: 'pi pi-fw pi-sitemap' }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

  }

  ngOnInit(): void {

    this.ds.banner({}).subscribe((response) => {
      if (response.status == true) {
        this.post = response.data;
        console.log(this.post)
      }
      else
        alert(response.message)
    })

  }

  // Start Of Add New Baner

  selectimage(ev) {
    if (ev.length > 0) {

      const file = ev[0];
      this.data = file;
    }
  }

  submit() {
    this.submitted = false;
    const formdata = new FormData();
    if (Boolean(this.data) == false) {
      alert("Please Choose file");
      return true;
    }
    if (Boolean(this.titleProp.trim()) == false || Boolean(this.descProp.trim()) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    if (Boolean(this.statusProp) == false) {
      this.statusProp = false;
    }

    formdata.append('bannerImage', this.data);
    formdata.append('title', this.titleProp);
    formdata.append('description', this.descProp);
    formdata.append('status', this.statusProp);

    this.ds.newbanner(formdata).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'success', summary: 'Banner Added', detail: response.message });
        this.statusProp = '';
        this.descProp = '';
        this.titleProp = '';
        this.data = '';
        this.ds.banner({}).subscribe((response) => {
          if (response.status == true) {
            this.post = response.data;
            this.productDialog = false
          }
          else
            alert(response.message)
        })

      } else {
        alert(response.message)
        this.statusProp = '';
        this.descProp = '';
        this.titleProp = '';
        this.productDialog = false
      }

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

  UpdateBanner() {
    this.submitted = false;
    const formdata = new FormData();

    if (Boolean(this.products.title.trim()) == false || Boolean(this.products.description.trim()) == false || Boolean(this.products.sequence) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    formdata.append('bannerImage', this.editData);
    formdata.append('oldImage', this.products.imagePath);
    formdata.append('bannerId', this.products._id);
    formdata.append('title', this.products.title.trim());
    formdata.append('description', this.products.description.trim());
    formdata.append('sequence', this.products.sequence);

    this.ds.BannerUpdate(formdata).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: response.message });
        this.editData = '';
        this.ds.banner({}).subscribe((response) => {
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
  enable(i) {

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Active this Banner?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.BannerStatusEnable({ bannerId: i, status: true }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.ds.banner({}).subscribe((response) => {
              if (response.status == true) {
                this.post = response.data;
                console.log(this.post)
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

  disable(i) {
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Deactive this Banner?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.BannerStatusEnable({ bannerId: i, status: false }).subscribe((response) => {
          if (response.status == true)
         
          {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            this.ds.banner({}).subscribe((response) => {
              if (response.status == true) {
                this.post = response.data;
                console.log(this.post)
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
        this.ds.BannerDelete({ bannerId: this.products._id }).subscribe(async (response) => {
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
}
