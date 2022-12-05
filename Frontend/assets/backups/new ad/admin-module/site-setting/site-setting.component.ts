import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-site-setting',
  templateUrl: './site-setting.component.html',
  styleUrls: ['./site-setting.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SiteSettingComponent implements OnInit {

  imagepath = environment.server;
  //imagepath = 'http://18.223.136.68/';


  items;
  product;
  siteDialog: boolean;
  selectedProducts;
  siteDetail;
  HideInput = true;
  HideCancelButton = false;
  DisableEditButton = false;
  HideLogo = true;
  HideFileInput = false;
  mesg: SafeResourceUrl;
  data;
  constructor(private ds: AdminDataService, private msg: MessageService, private sanitize: DomSanitizer) {

    // BreadCrumb
    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-cog', label: ' Site' },
      { icon: 'pi pi-pw pi-globe', label: ' Site Setup' }
    ];

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
    this.ds.getsite({}).subscribe((response) => {
      if (response.status == true) {
        this.siteDetail = [response.data];
        console.log(this.siteDetail)
        this.mesg = this.sanitize.bypassSecurityTrustResourceUrl(this.siteDetail[0].youtubeVideo)
        console.log(this.mesg);
      }

      else
        alert(response.message)
    })
  }

  // Start of Initialize Add New Banner Modal
  OpenEditSiteDialog() {
    this.HideInput = false;
    this.HideCancelButton = true;
    this.DisableEditButton = true;
    this.HideLogo = false;
    this.HideFileInput = true;
  }

  hideDialog() {
    this.HideInput = true;
    this.HideCancelButton = false;
    this.DisableEditButton = false;
    this.HideLogo = true;
    this.HideFileInput = false;
  }

  // End  of Initialize Add New Banner Modal

  //Update Site Setting

  selectimage(ev) {
    if (ev.length > 0) {

      const file = ev[0];
      this.data = file;
    }
  }

  updateSite(product) {
    const formdata = new FormData();
    
    // if (Boolean(product[0].contactNo) == false || Boolean(product[0].email) == false || Boolean(product[0].location) == false || Boolean(product[0].copyright) == false || Boolean(product[0].facebook) == false || Boolean(product[0].instagram) == false || Boolean(product[0].googlePlus) == false || Boolean(product[0].accreditations) == false || Boolean(product[0].imagePath) == false || Boolean(product[0].youtubeVideo) == false)
    //  {
    //    alert('Please Fill All Fields');
    //    return true;
    //  } 

     formdata.append('settingImage', this.data);
     formdata.append('oldImage', product[0].imagePath);
     formdata.append('contactNo', product[0].contactNo);
     formdata.append('email', product[0].email);
     formdata.append('location', product[0].location);
     formdata.append('officeTiming', product[0].officeTiming);
     formdata.append('aboutUs', product[0].aboutUs);
     formdata.append('copyright', product[0].copyright);
     formdata.append('facebook', product[0].facebook);
     formdata.append('instagram', product[0].instagram);
     formdata.append('googlePlus', product[0].googlePlus);
     formdata.append('accreditations',product[0].accreditations);
     formdata.append('youtubeVideo', product[0].youtubeVideo);
     
    this.ds.updateSite(formdata).subscribe((response)=>{
        if(response.status==true){
          this.msg.add({ severity: 'success', summary: 'Updated', detail: response.message });
            this.data='';
            this.ds.getsite({}).subscribe((response) => {
              if (response.status == true) {
                this.siteDetail = [response.data];
                this.mesg = this.sanitize.bypassSecurityTrustResourceUrl(this.siteDetail[0].youtubeVideo)
                this.HideInput = true;
                this.HideCancelButton = false;
                this.DisableEditButton = false;
                this.HideLogo = true;
                this.HideFileInput = false;
              }
        
              else
                this.msg.add({severity: 'error', summary: "Couldn't Update", detail: response.message});
            }, (error)=>{
              if(error instanceof ErrorEvent)
                this.msg.add({severity: 'error', summary: "Error Occured", detail: "Sorry some unknown error occured in the browser"});
              else 
              this.msg.add({severity: 'error', summary: "Couldn't Update", detail: error.error.message});
            })

        }else{
          alert(response.message)
        }
    })
  }



}
