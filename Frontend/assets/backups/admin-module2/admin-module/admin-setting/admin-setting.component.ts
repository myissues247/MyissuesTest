import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AdminSettingComponent implements OnInit {

  items = [];
  currentPassword;
  newPassword;
  confirmPassword;
  constructor(private ds:AdminDataService,private messageService: MessageService) {

    //BreadCrumb

    this.items = [
      { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
      { icon: 'pi pi-pw pi-cog', label: ' Admin Setting' },
      { icon: 'pi pi-pw pi-lock', label: '  Password' }
    ];

  }

  ngOnInit(): void {
  }

  updatePassword(){
    if(Boolean(this.currentPassword)==false){
      alert("Please Enter Old Password")
      return true;
    }
    if(Boolean(this.newPassword)==false){
      alert("Please Enter New Password")
      return true;
    }
    if(Boolean(this.confirmPassword)==false){
      alert("Please Enter Confirm Password")
      return true;
    }
    if(this.newPassword != this.confirmPassword)
    {
      alert("Both Password Are Not Matched")
      return true
    }
    this.ds.updatepassword({currentPassword:this.currentPassword,newPassword:this.newPassword,confirmPassword:this.confirmPassword}).subscribe((response)=>{
      this.messageService.add({ severity: 'success', summary: 'Password Changed', detail: response.message });
      this.newPassword=this.currentPassword=this.confirmPassword='';
    },(error)=>{
      console.log(error.error)
    })

  }

}
