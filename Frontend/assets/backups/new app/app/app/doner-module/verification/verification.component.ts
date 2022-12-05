import { HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { DonerDataService } from '../doner-data.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
  providers: [DonerDataService]
})
export class VerificationComponent  implements OnInit, AfterViewInit, OnDestroy {
  submitting: boolean = false;
  UserData;
  // bankDetails : File;
  identityImages : any[];
  identityDetails : File;
  base64IdentityImages = [];
  // selectedBankData = {
  //   base64BankImage : null,
  //   name : '',
  //   type : ''
  // }
  selectedIdentity = {
    base64IdentityImage : null,
    name : "",
    type : ""
  }

  idenitityImagesCount = {
    min: 2,
    max: 3
  }
  identityDetailsServer : any = {};
  identityImagesServer = [];
  
  constructor(private router:Router, private ds: UserDataService, private ss: StateService, private Userdata:DonerDataService, private loader: LoaderService) { 
    this.identityImages = [];
  }

  ngOnInit(): void {
    this.UserData=this.Userdata.getUserInfo();  
    this.ss.getUserSessionObservable().subscribe((session)=>{
      this.UserData.firstname = session.firstname;
      this.UserData.lastname = session.lastname;
      this.UserData.email = session.email;
      // if(session.verificationStatus > 0){
        this.getProfile()
      // }
    });
  }


  getProfile() {
    this.load();
    this.Userdata.get_profile().subscribe((response)=>{
      this.stopload();
      if(response.status) {
        this.Userdata.UserData = response.data;
        const date = new Date();
        this.Userdata.UserData.dob = (date.getUTCMonth() + 1) + "-"  + date.getDate() + "-" + date.getFullYear();
        this.UserData = this.Userdata.UserData;
        this.identityDetailsServer = response.data.identityProof;
        console.log(this.identityDetailsServer);
        this.identityImagesServer = response.data.identityImages;
      } else {
        this.ds.newMessage('error', 'Couldn\'t Fetch Record', response.message); 
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)  
         this.ds.newMessage('error', 'Error Occured', "sorry some unknown error occured");
      else 
        this.ds.newMessage('error', 'Couldn\'t Fetch Record', `${error.status} : ${error.error.message}`);
      this.stopload();
    })
  }

  ngAfterViewInit() : void {
    // this.bankDetails = this.Userdata.bankDetails;
    // this.checkPreSelectBankDetails();
  }
  
  ngOnDestroy() : void {
        // if(this.UserData.firstname && this.UserData.lastname && this.UserData.email && this.UserData.contactNo && this.UserData.age && this.UserData.DOB && this.UserData.Address && this.UserData.proving)
    // {
      
   // }  
    // this.Userdata.bankDetails = this.bankDetails;
    delete this.selectedIdentity;
    // delete this.selectedBankData;
    delete this.UserData;
    delete this.identityImages;
  }
  
  submit(form){
    if(form.status == "INVALID")
      return this.ds.newMessage('error', 'Incorrect Form', "please fill all the required values correctly");
    if(!this.identityDetails && !this.identityDetailsServer) 
      return this.ds.newMessage('error', 'Incorrect Form', 'Please select an identity Proof');
    const total =(this.identityImages?.length || 0 ) //+ (this.identityImagesServer?.length || 0);
    if( total  < this.idenitityImagesCount.min  && this.identityImagesServer?.length < 2)
       return this.ds.newMessage('error', 'Incorrect Form', 'Please select '+ (this.idenitityImagesCount.min - total) + ' more identity images');
    if( total  > this.idenitityImagesCount.max)
       return this.ds.newMessage('error', 'Incorrect Form', 'Please select maximum'+ this.idenitityImagesCount.max +' identity images');
    this.load();
    this.Userdata.identityDetails = this.identityDetails;
    this.Userdata.identityImages = this.identityImages;
    this.Userdata.doner_verification().subscribe((events)=>{
      if(events.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * events.loaded / events.total), "Uploading Media....");
      } else if(events instanceof HttpResponse) {
      const response = events.body;
      this.stopload();
      if(response.status) {
        this.ds.newMessage('success', 'Details Submitted', response.message);
        this.ss.verificationStatusChange(1);
        this.router.navigate(['/doner']);
      } else {
        console.log(response);
        alert(response.message);
      }
    }}, (error)=> {
      if(error instanceof ErrorEvent)  
        alert("sorry some unknown error occured");
      else 
        alert(`${error.status} : ${error.error.message}`);
      this.stopload();
    });
  }


  selectIdentityImages(event) {
    this.identityImages?.splice(0);
    this.showThumbnail(event.target.files);
  }

  showThumbnail(files) {
    this.base64IdentityImages.splice(0);
    if(!(files instanceof Array)) {
      for(let file of files) {
        this.identityImages.push(file);
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

  // selectBankDetails(event) {
  //   this.bankDetails = event.target.files[0];
  //   this.checkPreSelectBankDetails()
  // }

  // checkPreSelectBankDetails() {
  //     if(this.bankDetails.name != '') {
  //       this.selectedBankData.name = this.bankDetails.name,
  //       this.selectedBankData.type = this.bankDetails.type
  //       if(this.selectedBankData.type != 'application/pdf') {
  //         const fileReader = new FileReader();
  //         fileReader.onload = () => this.selectedBankData.base64BankImage = fileReader.result;
  //         fileReader.onabort = () => console.log(fileReader.error);
  //         fileReader.readAsDataURL(this.bankDetails);
  //       } else {
  //         this.selectedBankData.base64BankImage = null
  //       }
  //     }
  // }

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


  selectIdentity(event) {
    this.identityDetails = event.target.files[0];
    this.checkPreSelectIdentityDetails();
  }

  checkPreSelectIdentityDetails() {
    if(this.identityDetails?.name != '') {
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

  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }


}
