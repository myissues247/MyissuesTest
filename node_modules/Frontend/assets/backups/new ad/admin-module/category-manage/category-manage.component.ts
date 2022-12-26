import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api'
import { AdminDataService } from 'src/app/services/admin-data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CategoryManageComponent implements OnInit {

  //imagepath = 'http://localhost:8000/';
  imagepath = environment.server + '/';
  submitting: boolean = false;
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
  post=[];
  editDialog: boolean;
  showDialog: boolean=false;
  loading:boolean;
  
  // first = 0;
  totalRecords: number;
  virtual;
  first=0;
  row=1;
  laziness:boolean=true;
  constructor(private ds:AdminDataService,private cnfrm: ConfirmationService, private messageService: MessageService, private loader: LoaderService) { 
    

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-cog', label: ' Additional Setting' },
      { icon: 'pi pi-pw pi-plus', label: ' Category' }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

  }

  ngOnInit(): void {

   this.getAllCategory();
  }

  // Get All Category
  getAllCategory(){
    this.loading=true;
    this.ds.category({}).subscribe(async (response) => {
      this.loading=false;
      if (response.status == true) {
        this.totalRecords=await response.data.categoriesCount;
      }
      else
        alert(response.message)
    }, this.handle_error.bind(this))


  }


   // Start Of Add New Category

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

    formdata.append('categoryImage', this.data);
    formdata.append('title', this.titleProp);
    formdata.append('description', this.descProp);
    formdata.append('status', this.statusProp);
    this.load();
    this.ds.newcategory(formdata).subscribe(async (events) => {
      if(events.type == HttpEventType.UploadProgress){
        this.loader.load(Math.round(100 * events.loaded / events.total))
      }
      else if(events instanceof HttpResponse){
      this.stopload();
      const response = events.body;
      if (response.status == true) {
        this.messageService.add({ severity: 'success', summary: 'Category Added', detail: response.message });
        this.statusProp = '';
        this.descProp = '';
        this.titleProp = '';
        this.data = '';
        await this.ds.category({}).subscribe((response) => {
          if (response.status == true) {
            this.post = response.data.categories;
            this.productDialog = false;
          }
          else
            alert(response.message)
        })

      } else {
        this.stopload();
        alert(response.message)
        this.statusProp = '';
        this.descProp = '';
        this.titleProp = '';
        this.productDialog = false
      }
    }   
    }, this.handle_error.bind(this))
  }

  // End Of Add New Category


  // Start of Initialize Add New Category Modal
  newProduct() {
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
  }

  // End  of Initialize Add New Category Modal



  // Start of Initialize Edit Category Modal
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

    formdata.append('categoryImage', this.editData);
    formdata.append('oldImage', this.products.imagePath);
    formdata.append('categoryId', this.products._id);
    formdata.append('title', this.products.title.trim());
    formdata.append('description', this.products.description.trim());
    formdata.append('sequence', this.products.sequence);
    
    this.load();
    this.ds.categoryUpdate(formdata).subscribe((events) => {
      if(events.type == HttpEventType.UploadProgress){
        this.loader.load(Math.round(100 * events.loaded / events.total))
      } else if(events instanceof HttpResponse) {
        this.stopload();
        const response = events.body
      if (response.status == true) {
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: response.message });
        this.editData = '';
        this.ds.category({}).subscribe((response) => {
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
    }

    }, this.handle_error.bind(this));

  }

  // End of Initialize Edit Category Modal

  // Start of Show  Category Modal

  showProduct(product) {
    this.products = { ...product };
   
    this.showDialog = true;
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  // End of Show  Category Modal


  //  Start of Enable of Category
  enable(i) {
     
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Active this Category?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.load();
        this.ds.CategoryStatusEnable({ categoryId: i, status: true }).subscribe((response) => {
          this.stopload();
          if (response.status == true)
          // alert(response.message)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.ds.category({}).subscribe((response) => {
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
        }, (error)=>{
          if(error instanceof ErrorEvent)
           alert("Sorry some error occured on the client side");
          else 
           alert(error.status + " : " + error.error.message); 
           this.stopload();
        })

      },
      reject: () => {
      }
    });


  }

  //  End of Enable of Category

  //  Start of Disable of Category

  disable(i) {
    const self = this;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Deactive this category?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        self.load();
        this.ds.CategoryStatusEnable({ categoryId: i, status: false }).subscribe((response) => {
          self.stopload();
          if (response.status == true)
         
          {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            this.ds.category({}).subscribe((response) => {
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
        }, self.handle_error.bind(self))

      },
      reject: () => {
      }
    });

  }

  //  End of Disable of Category


  //Start Of Delete Category

  deleteBanner(product) {
    const self = this;
    this.products = { ...product };
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Delete this Category?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-trash',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        self.load();
        this.ds.CategoryDelete({ categoryId: this.products._id }).subscribe(async (response) => {
          self.stopload();
          if (response.status == true) {

            //this.post = await response.data.categories;

            this.messageService.add({ severity: 'error', summary: 'Deleted', detail: response.message });
            // this.post = this.post.filter((category)=> category._id != product._id)
            // console.log(product._id);
            this.ds.category({}).subscribe((response) => {
              if (response.status == true) {
                this.post = response.data.categories;
                console.log(this.post)
              }
              else
                alert(response.message)
            })

          }
          else
            this.messageService.add({severity: 'error', summary: 'Couldn\'t Delete', detail: response.message})
        }, self.handle_error.bind(self));

      },  
      reject: () => {
      }
    });
  }
  // End Of Delete Category


  loadCategory(event:LazyLoadEvent){
    
    setTimeout(() => {
      this.loading = true;
      this.ds.category({ skip: event.first, limit: event.rows }).subscribe(async (response) => {
        this.loading=false;
        if (response.status == true) {
          this.post=await  response.data.categories;
        }
        else
          alert(response.message)
      }, this.handle_error.bind(this))

    }, 1000);
  }
  

  handle_error(error){
      if(error instanceof ErrorEvent)
        alert("Sorry some error occured on the client")
      else
        alert(error.status + " : " + error.error.message);
      this.stopload();
  }

  load() {
    this.loader.start();
    this.submitting = true;
  }

  stopload() {
    this.loader.stop();
    this.submitting = false;
  }

}
