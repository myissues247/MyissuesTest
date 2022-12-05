import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserdataService } from '../../userdata.service';

@Component({
  selector: 'app-getuser',
  templateUrl: './getuser.component.html',
  styleUrls: ['./getuser.component.css']
})
export class GetuserComponent implements OnInit, AfterViewInit {
  unsubscribe$;  //subject to unsub all sub.
  UserData : any = {};
  bankDetails : File;
  identityDetails : File;
  base64IdentityImages = [];
  selectedBankData = {
    base64BankImage : null,
    name : '',
    type : ''
  }
  selectedIdentity = {
    base64IdentityImage : null,
    name : "",
    type : ""
  }
  
  idenitityImagesCount = {
    min: 2,
    max: 3
  }
  identityDetailsServer : any;
  bankDetailsServer : any;
  identityImagesServer : String[] = [];

  verificationStatus : number = null;
  constructor(private router:Router, public ss: StateService, public ds: UserDataService, public Userdata:UserdataService) { 
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    // this.UserData=this.Userdata.getUserInfo().PersonalInfo; 
    // console.log(this.UserData.dob);
    // const date = new Date(this.UserData.dob);
    // this.UserData.dob = new Date((date.getUTCMonth() + 1) + "-"  + date.getDate() + "-" + date.getFullYear());
    // console.log(this.UserData.dob);

    // this.identityDetailsServer = this.Userdata.UserData.identityDetailsServer;
    // this.bankDetailsServer = this.Userdata.UserData.bankDetailsServer;
    // this.identityImagesServer = this.Userdata.UserData.identityImagesServer;
    
    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsubscribe$)).subscribe((session)=>{
      this.UserData.firstname = session.firstname;
      this.UserData.lastname = session.lastname;
      this.UserData.email = session.email;
      this.verificationStatus = session.verificationStatus;
    });
     
    this.Userdata.userinfoObservable().pipe(takeUntil(this.unsubscribe$)).subscribe((data: any)=>{
        if(data instanceof Object){
        this.UserData= data.PersonalInfo;
        
        const date = new Date(this.UserData.dob);
        this.UserData.dob = new Date((date.getUTCMonth() + 1) + "-"  + date.getDate() + "-" + date.getFullYear());
        console.log(this.UserData.dob);

        this.identityDetailsServer = data.identityDetailsServer;
        this.bankDetailsServer = data.bankDetailsServer;
        this.identityImagesServer = data.identityImagesServer;
      } 
    })
  }

  ngAfterViewInit() : void {
    this.bankDetails = this.Userdata.bankDetails;
    this.checkPreSelectBankDetails();

    this.identityDetails = this.Userdata.identityDetails;
    this.checkPreSelectIdentityDetails();
    this.showThumbnail(this.UserData.identityImages);
  }

  nextPage(form){
    // if(this.UserData.firstname && this.UserData.lastname && this.UserData.email && this.UserData.contactNo && this.UserData.age && this.UserData.DOB && this.UserData.Address && this.UserData.proving)
    // {
      
   // }
    if(form.status == "INVALID") {
      return this.ds.newMessage('error', 'Incorrect Form', "Please fill the required details correctly");
    }  
    if(!this.identityDetails && !this.identityDetailsServer) 
       return this.ds.newMessage('error', 'Incorrect Form', 'Please select an identity Proof');
    const total =(this.UserData.identityImages.length || 0 )// + (this.identityImagesServer?.length || 0);
    if( total  < this.idenitityImagesCount.min && this.identityImagesServer?.length < 2)
       return this.ds.newMessage('error', 'Incorrect Form', 'Please select '+ (this.idenitityImagesCount.min - total) + ' more identity images');
    if( total  > this.idenitityImagesCount.max)
       return this.ds.newMessage('error', 'Incorrect Form', 'Please select maximum'+ this.idenitityImagesCount.max +' identity images');
    
    this.Userdata.bankDetails = this.bankDetails;
    this.Userdata.identityDetails = this.identityDetails;
    delete this.selectedIdentity;
    delete this.selectedBankData;
    delete this.UserData;
    this.router.navigate(['/receiver/verification/neighbour'])
  }


  selectIdentityImages(event) {
    this.UserData.identityImages.splice(0);
    this.showThumbnail(event.target.files);
  }

  showThumbnail(files) {
    this.base64IdentityImages.splice(0);
    if(!(files instanceof Array)) {
      for(let file of files) {
        this.UserData.identityImages.push(file);
        const fileReader = new FileReader();
        fileReader.onload = () => this.base64IdentityImages.push(fileReader.result);
        fileReader.onabort = () => console.log(fileReader.error);
        fileReader.readAsDataURL(file);
      }
    } else if(files instanceof Array) {
      files.map((file)=>{
        const fileReader = new FileReader();
        fileReader.onload = () => this.base64IdentityImages.push(fileReader.result);
        fileReader.onabort = () => console.log(fileReader.error);
        fileReader.readAsDataURL(file);
      })
    }
  }

  selectBankDetails(event) {
    this.bankDetails = event.target.files[0];
    this.Userdata.UserData.bankDetailsServer = null;
    this.checkPreSelectBankDetails()
  }

  checkPreSelectBankDetails() {
      if(this.bankDetails instanceof Object && this.bankDetails.name != '') {
        this.selectedBankData.name = this.bankDetails.name,
        this.selectedBankData.type = this.bankDetails.type
        if(this.selectedBankData.type != 'application/pdf') {
          const fileReader = new FileReader();
          fileReader.onload = () => this.selectedBankData.base64BankImage = fileReader.result;
          fileReader.onabort = () => console.log(fileReader.error);
          fileReader.readAsDataURL(this.bankDetails);
        } else {
          this.selectedBankData.base64BankImage = null
        }
      }
  }


  selectIdentity(event) {
    this.identityDetails = event.target.files[0];
    this.Userdata.UserData.identityDetailsServer = null;
    this.checkPreSelectIdentityDetails();
  }

  checkPreSelectIdentityDetails() {
    if(this.identityDetails instanceof Object && this.identityDetails.name != '') {
      this.selectedIdentity.type = this.identityDetails.type;
      this.selectedIdentity.name = this.identityDetails.name;
      if(this.selectedIdentity.type != 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = () => this.selectedIdentity.base64IdentityImage = fileReader.result;
        fileReader.onabort = () => console.log(fileReader.error);
        fileReader.readAsDataURL(this.identityDetails);
      } else {
        this.selectedIdentity.base64IdentityImage = null
      }
    }
  }

  deleteIdentityImage(image, i) : void {
    this.Userdata.deleteIdentityImage(image).subscribe((response)=>{
      if(response.status) {
        this.ds.newMessage('success', 'Image Deleted', response.message);
        if(this.identityImagesServer[i] == image) 
          this.identityImagesServer.splice(i, 1);
        else {
          i = this.identityImagesServer.indexOf(image);
          this.identityImagesServer.splice(i, 1);
        }
      } else {
        this.ds.newMessage('error', 'Couldn\'t Delete Image', response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent) 
        this.ds.newMessage('error', 'Unknown Error Occured', 'Some unknown error occured on the client');
      else 
        this.ds.newMessage('error', 'Couldn\'t Delete Image', error.error.message);
    })
  }

}
 