import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api'
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-province-manage',
  templateUrl: './province-manage.component.html',
  styleUrls: ['./province-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProvinceManageComponent implements OnInit {
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
  countryName;
  countryId;
  totalRecords:number=0;
  first=0;
  last=0;
  
  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService) {

       //BreadCrumb

       this.items = [
        { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
        { icon: 'pi pi-pw pi-map-marker', label: ' Location' },
        { icon: 'pi pi-pw pi-sitemap', label: ' Province' }
      ];
  
      //Status Detail
  
      this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];
  
  
      //Product Detail
      this.product = [
        {
          "id": "1000",
          "code": "f230fh0g3",
          "name": "Bamboo Watch",
          "description": "Product Description",
          "image": "bamboo-watch.jpg",
          "price": 65,
          "category": "Accessories",
          "quantity": 24,
          "inventoryStatus": "INSTOCK",
          "rating": 5
        }
      ]

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

   // Start Of Add New Baner


  submit() {
    this.submitted = false;
    
    if (Boolean(this.titleProp.trim()) == false ) {
      alert("Please Fill Province Name Fields");
      return true;
    }

    if (Boolean(this.statusProp) == false) {
      this.statusProp = false;
    }
    this.ds.AddProvice({countryName:this.titleProp.trim(),status:this.statusProp}).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'success', summary: 'Province Added', detail: response.message });
        this.statusProp = '';
        this.titleProp = '';
        this.ds.country({}).subscribe((response) => {
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
    this.countryName=this.products.countryName;
    this.countryId=this.products._id;
    this.editDialog = true;
  }

  hideEditDialog() {
    this.countryId='';
    this.countryName='';
    this.editDialog = false;
  }

  UpdateBanner() {
    this.submitted = false;
    const formdata = new FormData();

    if (Boolean(this.countryName.trim()) == false || Boolean(this.countryId) == false ) {
      alert("Please Fill All Fields");
      return true;
    }

    this.ds.ProvinceUpdate({countryName:this.countryName,countryId:this.countryId}).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: response.message });
        this.editData = '';
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
      message: 'Are you sure that you want to Active this Province?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.CountryStatusEnable({ countryId: i, status: true }).subscribe((response) => {
          if (response.status == true)
          // alert(response.message)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.ds.country({}).subscribe((response) => {
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
      message: 'Are you sure that you want to Deactive this Province?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.CountryStatusEnable({ countryId: i, status: false }).subscribe((response) => {
          if (response.status == true)
         
          {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            this.ds.country({}).subscribe((response) => {
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
      message: 'Are you sure that you want to Delete this Province?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-trash',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.CountryDelete({ countryId: this.products._id }).subscribe(async (response) => {
          if (response.status == true) {

            this.post = await response.data;

            this.messageService.add({ severity: 'error', summary: 'Deleted', detail: response.message });
            this.ds.country({}).subscribe((response) => {
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
  // End Of Delete Banner


}
