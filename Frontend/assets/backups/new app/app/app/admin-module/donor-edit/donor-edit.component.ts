import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-donor-edit',
  templateUrl: './donor-edit.component.html',
  styleUrls: ['./donor-edit.component.css']
})
export class DonorEditComponent implements OnInit {
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

  identityDetailsServer : any = {};
  identityImagesServer = [];
  
  donorId;
  constructor(private router:Router, private ar: ActivatedRoute, private ds: UserDataService, private ss: StateService, private loader: LoaderService, private ads: AdminDataService) { 
    this.identityImages = [];
    this.UserData={
    
      firstname:'',
      lastname:'',
      age:null,
      email:'',
      dob:null,
      contact:null,
      address:'',
      state:'',
      city:'',
      zipCode:null,
      area:'',

   } 
  }

  ngOnInit(): void {
    this.donorId = this.ar.snapshot.paramMap.get('donorId');
    if(!this.donorId) {
      this.ds.newMessage('error', "No Donor Selected", "Please select a donor to edit");
      this.router.navigate(['/admin-module/donner']);
    }
    this.getProfile();
  }


  getProfile() {
    this.load();
    this.ads.get_donor_profile(this.donorId).subscribe((response)=>{
      this.stopload();
      if(response.status) {
        this.UserData = response.data;
        const date = new Date();
        this.UserData.dob = (date.getUTCMonth() + 1) + "-"  + date.getDate() + "-" + date.getFullYear();
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
  }
  
  ngOnDestroy() : void {
  }
  
  submit(form){
    if(form.status == "INVALID")
      return this.ds.newMessage('error', 'Incorrect Form', "Please fill all the required values correctly")
    this.load();
    const data = {
      UserData : this.UserData,
      identityDetails: this.identityDetails,
      identityImages : this.identityImages,
    }
    this.ads.doner_verification(data, this.donorId).subscribe((events)=>{
      if(events.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * events.loaded / events.total), "Uploading Media....");
      } else if(events instanceof HttpResponse) {
      const response = events.body;
      this.stopload();
      if(response.status) {
        this.ds.newMessage('success', 'Donor Saved', response.message);
        this.ss.verificationStatusChange(1);
        this.router.navigate(['/admin-module/donner']);
      } else {
        alert(response.message);
      }
    }}, (error)=> {
      if(error instanceof ErrorEvent)  
        alert("sorry some unknown error occured");
      else 
        alert(`${error.error.message}`);
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
