import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api'
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-city-manage',
  templateUrl: './city-manage.component.html',
  styleUrls: ['./city-manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CityManageComponent implements OnInit {
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
  submitted;
  editDialog;
  countryId;
  cityName;
  cityId;
  constructor(private ds:AdminDataService,private messageService:MessageService,private cnfrm: ConfirmationService) {
     //BreadCrumb

     this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-map-marker', label: ' Location' },
      { icon: 'pi pi-pw pi-map-marker', label: ' City' }
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


  //Start of NewCity
  newCity(product,ev){
    this.products = { ...product };
    this.countryName=ev.countryName;
    this.countryId=ev._id;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
  }

  submit(product){
    if (Boolean(this.countryId) == false ) {
      alert("Please Refresh Page");
      return true;
    }

    if (Boolean(this.cityName.trim()) == false ) {
      alert("Please Fill City Name Fields");
      return true;
    }

    if (Boolean(product.stateName.trim()) == false ) {
      alert("Please Fill State Name Fields");
      return true;
    }


    if (Boolean(this.statusProp) == false) {
      this.statusProp = false;
    }
    this.ds.AddCity({countryId:this.countryId,stateName:product.stateName.trim(),cityName:this.cityName.trim(),status:this.statusProp}).subscribe((response)=>{
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
  
  //End of NewCity

  //  Start of Enable of Banner
enable(i,p) {
  this.cnfrm.confirm({
    message: 'Are you sure that you want to Active this City?',
    header: 'Confirmation',
    acceptButtonStyleClass: 'p-button-success',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.ds.CityStatusEnable({ countryId: i,cityId:p, status: true }).subscribe((response) => {
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
    message: 'Are you sure that you want to Deactive this City?',
    header: 'Confirmation',
    acceptButtonStyleClass: 'p-button-danger',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.ds.CityStatusEnable({ countryId: i,cityId:p, status: false }).subscribe((response) => {
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

  showProduct(product,ev,state) {
    this.countryName=ev.countryName;
    this.stateName=state;
   
    this.products = { ...product };
    
   
    this.showDialog = true;
  }

  hideshowDialog() {
    this.showDialog = false;
  }

  // End of Show  Banner Modal


  // Start of Initialize Edit Banner Modal
  editProduct(product,ev,state) {
    this.countryName=ev.countryName;
    this.stateName=state;
    this.countryId=ev._id;
    this.products = { ...product };
    this.cityName=this.products.cityName;
    this.cityId=this.products._id;

    this.editDialog = true;
  }

  hideEditDialog() {
    this.editDialog = false;
  }

  UpdateBanner() {
    this.submitted = false;
    const formdata = new FormData();

    if (Boolean(this.countryName.trim()) == false || Boolean(this.stateName.trim()) == false || Boolean(this.cityName.trim()==false)) {
      alert("Please Fill All Fields");
      return true;
    }

    this.ds.CityUpdate({countryId:this.countryId,cityId:this.cityId,stateName:this.stateName,cityName:this.cityName.trim()}).subscribe((response) => {
      if (response.status == true) {
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: response.message });
        //this.editData = '';
        this.ds.country({}).subscribe((response) => {
          if (response.status == true) {
            this.post = response.data;
            this.cityName=this.countryId=this.countryName=this.stateName=this.cityId='';
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
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Delete this City?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-trash',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ds.CityDelete({ cityId: product,countryId:ev }).subscribe(async (response) => {
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
