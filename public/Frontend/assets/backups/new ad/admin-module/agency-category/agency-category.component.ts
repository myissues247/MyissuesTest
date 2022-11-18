import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-agency-category',
  templateUrl: './agency-category.component.html',
  styleUrls: ['./agency-category.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AgencyCategoryComponent implements OnInit {
  imagepath = environment.server + '/';
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
  loading;
  totalRecords:number=0;
  first=0;
  last=0;

  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService) {

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { label: 'Agency', icon: 'pi pi-fw pi-sitemap' },
      { icon: 'pi pi-fw pi-map', label: ' Agency Category' }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

  }

  ngOnInit(): void {

    this.ds.get_agency_categories().subscribe((response) => {
      console.log(response);
      
      if (response.status == true) {
        this.post = response.data.categories;
        this.totalRecords=response.data.categoriesCount;
        // console.log(this.post)
        // console.log(this.post.length);
        
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
    if (Boolean(this.titleProp.trim()) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    if (Boolean(this.statusProp) == false) {
      this.statusProp = false;
    }

    formdata.append('title', this.titleProp);
    formdata.append('status', this.statusProp);
    
    console.log(formdata);
    this.ds.add_agency_categories({title: this.titleProp, status: this.statusProp}).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'success', summary: 'Category Added', detail: response.message });
        this.statusProp = '';
        this.descProp = '';
        this.titleProp = '';
        this.data = '';
        this.ds.get_agency_categories().subscribe((response) => {
          if (response.status == true) {
            this.post = response.data.categories;
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

    if (Boolean(this.products.title.trim()) == false) {
      alert("Please Fill All Fields");
      return true;
    }

    formdata.append('categoryId', this.products._id);
    formdata.append('title', this.products.title.trim());

    this.ds.update_agency_categories({categoryId: this.products._id, title: this.products.title}).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: response.message });
        this.editData = '';
        this.ds.get_agency_categories().subscribe((response) => {
          if (response.status == true) {
            this.post = response.data.categories;
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
      message: 'Are you sure that you want to Active this Category?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.update_agency_categories_status({ categoryId: i, status: true }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.ds.get_agency_categories().subscribe((response) => {
              if (response.status == true) {
                this.post = response.data.categories;
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
      message: 'Are you sure that you want to Deactive this Category?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.update_agency_categories_status({ categoryId: i, status: false }).subscribe((response) => {
          if (response.status == true)
         
          {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            this.ds.get_agency_categories().subscribe((response) => {
              if (response.status == true) {
                this.post = response.data.categories;
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
      message: 'Are you sure that you want to Delete this Category?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-trash',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.delete_agency_categories({ categoryId: this.products._id }).subscribe(async (response) => {
          if (response.status == true) {
            this.messageService.add({ severity: 'error', summary: 'Deleted', detail: response.message });
            this.ds.get_agency_categories().subscribe((response) => {
              if (response.status == true) {
                this.post = response.data.categories;
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
  // End Of Delete Banner

  // Load Agency Category
  loadAgencyCategory(event:LazyLoadEvent){
    // setTimeout(() => {
    //   this.loading = true;

    //   this.ds.get_agency_categories({ skip: event.first, limit: event.rows }).subscribe((response)=>{
    //     this.loading = false;
    //     if(response.status==true){
    //         this.post=response.data.categories;
    //     } else {
    //       this.messageService.add({severity: 'error', summary: "Couldn't Fetch Donors", detail: response.message});
    //     }
    //   }, this.handle_error.bind(this))

    //   // this.ds.get_agency_categories().subscribe((response) => {
    //   //   console.log(response);
        
    //   //   if (response.status == true) {
    //   //     //this.post = response.data.categories;
    //   //     this.totalRecords=response.data.categoriesCount;
    //   //     // console.log(this.post)
    //   //     // console.log(this.post.length);
          
    //   //   }
    //   //   else
    //   //     alert(response.message)
    //   // })

    // }, 1000);

  }


  handle_error(error) {
    if(error instanceof ErrorEvent)
     this.messageService.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured on the browser"});
   else 
     this.messageService.add({severity: 'error', summary: "Failed", detail: error.error.message});
     this.loading = false;
  }

}
