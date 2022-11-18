import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ManageComponent implements OnInit {
  imagepath = environment.server;
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
  loading:boolean;
  city;
  accessOption;

  selectedAccess;
  sponsor;
  sponsorId;
  cause;

  constructor(private ds: AdminDataService, private cnfrm: ConfirmationService, private messageService: MessageService, private router: Router) {

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-user', label: ' User' },
      { label: ' Sponsors', icon: 'pi pi-fw pi-users' },
      { label: ' Manage', icon: 'pi pi-fw pi-user' }
    ];

    //Status Detail

    this.stateOptions = [{ label: 'Enable', value: true }, { label: 'Disable', value: false }];

    // Access Option
    this.accessOption=[{label:'Low',value:0},{label:'Med',value:1},{label:'High',value:2}]
  }

  ngOnInit(): void {
    this.ds.getAllSponsorDetail({}).subscribe((response) => {
      if (response.status) {
        this.post = response.data.sponsors;
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

  showAds(productId) {
    this.router.navigate(['/admin-module/receiver-ads'], {queryParams: {userId: productId}})
  }

  // Start of Initialize Add New Banner Modal
  newProduct() {
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
  }

  // End  of Initialize Add New Banner Modal



 

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
  enable(sponsorId, sponsor) {

    this.cnfrm.confirm({
      message: 'Are you sure that you want to Approve this Sponsor?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ds.approveSponsor({sponsorId, sponsor }).subscribe((response) => {
          if (response.status == true)
          {
            this.messageService.add({ severity: 'success', summary: 'Approved', detail: response.message });
            this.ds.getAllSponsorDetail({}).subscribe((response) => {
              if (response.status) {
                this.post = response.data.sponsors;
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

  disable(sponsorId, sponsor) {
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Reject this Sponsor?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    
        this.sponsorId = sponsorId;
        this.sponsor = sponsor;
        document.getElementById('click2').click();
      },
      reject: () => {
      }
    });

  }

  disableSponsor() {
    this.loading = true;
    this.ds.rejectSponsor({sponsorId: this.sponsorId, sponsor: this.sponsor, cause: this.cause }).subscribe((response) => {
      this.loading = false;
      if (response.status == true)
      {
        this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: response.message });
        document.getElementById('close').click();
        this.ds.getAllSponsorDetail({}).subscribe((response) => {
          this.loading = false;
          if (response.status) {
            this.post = response.data.sponsors;
            console.log(this.post)
          }
          else
            alert(response.message)
        })
      }
      else
        alert(response.message)
    })
  }

  //  End of Disable of Banner


  //Start Of Delete Banner

  deleteBanner(product) {
    this.products = { ...product };
    this.cnfrm.confirm({
      message: 'Are you sure that you want to Delete this Sponsor?',
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


  loadAgency(event){}

  accessChange(event,sponsorId, sponsor){
    this.sponsorId = sponsorId;
    this.sponsor = sponsor;
    this.selectedAccess = event.option.value;
    if(this.selectedAccess == 2)
      this.accessChangeHandler();
    else 
      document.getElementById('click3').click();
  }

  accessChangeHandler() {
    let access=this.selectedAccess;
    this.loading=true;
    if(isNaN(access)) return alert('Access Level Wrong')
    if(access != 0 && access != 1 && access != 2) return alert('Access Level Is Invalid')

   setTimeout(() => {
     this.loading=true;

     this.ds.updateSponsorAccessLevel({access,sponsorId:this.sponsorId, sponsor: this.sponsor, cause: this.cause}).subscribe(async (response)=>{
       if(response.status){
           await this.messageService.add({ severity: 'success', detail: response.message });
            await this.ds.getAllSponsorDetail({}).subscribe((response) => {
              this.loading=false;
              if (response.status) {
                this.post = response.data.sponsors;
                this.cause = null;
                document.getElementById('close1').click();
              }
              else{
                this.loading=false;
                alert(response.message)
              }
            },(err)=>{
              this.loading=false;
            })

       }else{

       }
     },(err)=>{
       this.loading=false;
     })
     
   }, 0);
  }
}
