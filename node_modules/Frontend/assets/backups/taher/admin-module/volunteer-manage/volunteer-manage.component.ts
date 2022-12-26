import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-volunteer-manage',
  templateUrl: './volunteer-manage.component.html',
  styleUrls: ['./volunteer-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class VolunteerManageComponent implements OnInit {
  submitting: boolean = false;
  imagepath;
  products;
  product;
  items=[];
  post;
  selectedProducts;
  first:number;
  loading;
  showDialog=false;

  constructor(private ds:AdminDataService,private router:Router,private cnfrm: ConfirmationService, private messageService: MessageService, private loader: LoaderService) {
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-cog', label: ' Additional Setting' },
      { icon: 'pi pi-fw pi-user-plus', label: ' Volunteer' }
    ];
   }

  ngOnInit(): void {
    this.ds.get_volunteers_all({skip: 0, limit: 15}).subscribe((response)=>{
      if(response.status==true){
          this.post=response.data.volunteers;
      }
    },(err)=>{
      console.log(err)
    })
  }

  newProduct(){}
  showProduct(post){
    this.products={ ...post } ;
      this.showDialog = true;
    }
  
    hideshowDialog() {
      this.showDialog = false;
    }
  
  editProduct(product){}
  deleteBanner(product){}
  //  Start of Enable of Banner
  enable(i) {
    const self = this;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to approve this volunteer?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        self.load();
        this.ds.approve_volunteer(i).subscribe((response) => {
          self.stopload();
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Activated', detail: response.message });
            this.ds.Get_Doner({}).subscribe((response) => {
              if (response.status == true) {
                this.post=response.data.doner;
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

  //  End of Enable of Banner

  //  Start of Disable of Banner

  disable(i) {
    const self = this;
    this.cnfrm.confirm({
      message: 'Are you sure that you want to reject this volunteer?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        self.load()
        this.ds.reject_volunteer(i).subscribe((response) => {
          self.stopload()
          if (response.status == true)
         
          {
            this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
            this.ds.Get_Doner({}).subscribe((response) => {
              if (response.status == true) {
                this.post=response.data.doner;
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

  //  End of Disable of Banner

  loadCustomers(event:LazyLoadEvent){
    console.log(event.first)
    console.log(event.rows)
  }

  handle_error(error) {
    if(error instanceof ErrorEvent)
      alert("Sorry, some error occured on the client");
    else 
      alert(error.status + ": " + error.error.message);
    this.stopload()
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
