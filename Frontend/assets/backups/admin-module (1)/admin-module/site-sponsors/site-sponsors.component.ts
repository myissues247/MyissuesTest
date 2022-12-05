import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api'
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-site-sponsors',
  templateUrl: './site-sponsors.component.html',
  styleUrls: ['./site-sponsors.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SiteSponsorsComponent implements OnInit {

  submitting: boolean = false;
  imagepath = environment.server + "/";
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

  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService, private loader: LoaderService) {

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-cog', label: ' Site' },
      { icon: 'pi pi-fw pi-images', label: ' Site Sponsors' }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

  }

  ngOnInit(): void {

    this.ds.site_sponsor({}).subscribe((response) => {
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
    if (Boolean(this.titleProp.trim()) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    if (Boolean(this.statusProp) == false) {
      this.statusProp = false;
    }

    formdata.append('siteSponsorImage', this.data);
    formdata.append('title', this.titleProp);
    formdata.append('status', this.statusProp);
    this.load();
    this.ds.new_site_sponsor(formdata).subscribe((event) => {
      if(event.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * event.loaded / event.total))
      } else if(event instanceof HttpResponse) {
      this.stopload()
      const response = event.body;
      if (response.status == true) {
        this.messageService.add({ severity: 'success', summary: 'Site Sponsor Added', detail: response.message });
        this.statusProp = '';
        this.descProp = '';
        this.titleProp = '';
        this.data = '';
        this.ds.site_sponsor({}).subscribe((response) => {
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

    }}, (err)=>{

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

    if (Boolean(this.products.title.trim()) == false || Boolean(this.products.sequence) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    formdata.append('siteSponsorImage', this.editData);
    formdata.append('oldImage', this.products.imagePath);
    formdata.append('siteSponsorId', this.products._id);
    formdata.append('title', this.products.title.trim());
    formdata.append('sequence', this.products.sequence);
    this.load();
    this.ds.site_sponsor_update(formdata).subscribe((event) => {
      if(event.type == HttpEventType.UploadProgress) {
        Math.round(Math.round(100 * event.loaded / event.total))
      }
      else if(event instanceof HttpResponse) {
      const response = event.body;
      this.stopload();
      if (response.status == true) {
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: response.message });
        this.editData = '';
        this.ds.site_sponsor({}).subscribe((response) => {
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

    }}, this.handle_error.bind(this))

  }

  // End of Initialize Edit Banner Modal
  
  handle_error(error){
    if(error instanceof ErrorEvent) 
      this.messageService.add({severity: "error", summary: "Error Occured", detail: "Sorry some error occured on the browser"});
    else
      this.messageService.add({severity: "error", summary: "Error", detail : error.error.message});
    this.stopload();
  }

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
    const self = this;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Active this Site Sponsor?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        self.load();
        this.ds.site_sponsor_status_enable({ siteSponsorId: i, status: true }).subscribe((response) => {
          self.stopload();
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.ds.site_sponsor({}).subscribe((response) => {
              if (response.status == true) {
                this.post = response.data;
                console.log(this.post)
              }
              else
              this.messageService.add({severity: 'error', summary: 'Couldn\'t Enable', detail: response.message})
            })
          }
          else
          this.messageService.add({severity: 'error', summary: 'Couldn\'t Enable', detail: response.message});
        }, self.handle_error.bind(self));

      },
      reject: () => {
      }
    });


  }

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(i) {
    const self = this;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Deactive this Site Sponsor?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        self.load();
        this.ds.site_sponsor_status_enable({ siteSponsorId: i, status: false }).subscribe((response) => {
          self.stopload();
          if (response.status == true)
         
          {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            this.ds.site_sponsor({}).subscribe((response) => {
              if (response.status == true) {
                this.post = response.data;
                console.log(this.post)
              }
              else
              this.messageService.add({severity: 'error', summary: 'Couldn\'t Disable', detail: response.message})
            })
          }
          else
          this.messageService.add({severity: 'error', summary: 'Couldn\'t Disable', detail: response.message})
        }, self.stopload.bind(self))

      },
      reject: () => {
      }
    });

  }

  //  End of Disable of Banner


  //Start Of Delete Banner

  deleteBanner(product) {
    const self = this;
    this.products = { ...product };
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Delete this Site Sponsor?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-trash',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        self.load();
        this.ds.site_sponsor_delete({ siteSponsorId: this.products._id }).subscribe(async (response) => {
          self.stopload();
          if (response.status == true) {

            this.post = await response.data;

            this.messageService.add({ severity: 'error', summary: 'Deleted', detail: response.message });
          }
          else
            this.messageService.add({severity: 'error', summary: 'Couldn\'t Delete', detail: response.message})
        }, self.handle_error.bind(self));

      },
      reject: () => {
      }
    });
  }
  // End Of Delete Banner
  
  
  load() {
    this.loader.start();
    this.submitting = true;
  }

  stopload() {
    this.loader.stop();
    this.submitting = false;
  }


}
