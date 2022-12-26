import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserdataService } from '../../userdata.service';

@Component({ 
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$;  //subject to unsub all sub.
  UserAllData;
  image;
  bankDetails;
  identityDetails;
  base64IdentityImages : any[] = [];
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

  submitting: boolean = false;
  constructor(public Userdata:UserdataService, private ds: UserDataService, private router:Router, private ss: StateService, private loader: LoaderService) {
     this.unsubscribe$ = new Subject()
   }

  ngOnInit(): void {
    this.UserAllData=this.Userdata.getUserInfo();
    this.Userdata.userinfoObservable().subscribe((data)=>{
      if(data instanceof Object)
        this.UserAllData = data;
    })
  }

  ngAfterViewInit() : void {
    this.convert_to_base64(this.UserAllData.PersonalInfo.identityImages);

    this.bankDetails = this.Userdata.bankDetails;
    this.checkPreSelectBankDetails();

    this.identityDetails = this.Userdata.identityDetails;
    this.checkPreSelectIdentityDetails();
    
    if(this.UserAllData.PetInfo.petImage instanceof File){ 
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.UserAllData.PetInfo.petImage);
      fileReader.onload = ()=> this.image = fileReader.result;
      fileReader.onerror = () => console.log(fileReader.error);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  convert_to_base64(images) {
    images.map((file)=>{
       const fileReader = new FileReader();
       fileReader.readAsDataURL(file);
       fileReader.onload = () => this.base64IdentityImages.push(fileReader.result);
       fileReader.onerror = () => console.log(fileReader.error);
    })
  }

  prevPage(){
    this.router.navigate(['/receiver/verification/pet'])
  }

  submit() {
    this.load();
    this.Userdata.receiver_verification(this.UserAllData).pipe(takeUntil(this.unsubscribe$)).subscribe((event)=>{
      if(event.type == HttpEventType.UploadProgress){
        this.loader.load(Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
      const response = event.body;
      this.stopload();
      if(response.status) {
        this.ds.newMessage('success', 'Details Submitted', response.message);
        this.ss.verificationStatusChange(1);
        this.router.navigate(['/receiver']);
      } else {
        console.log(response);
        this.ds.newMessage('error', 'Couldn\'t Submit', response.message);
      }
    }}, (error)=>{
      if(error instanceof ErrorEvent) 
         this.ds.newMessage('error', 'Error Occured', 'Sorry some unknown error occured');
      else 
         this.ds.newMessage('error', 'Error Occured', `${error.status}: ${error.error.message}`);
      this.stopload();
    })
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
  };

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
 

load() {
  this.submitting = true;
  this.loader.start();
}

stopload() {
  this.submitting = false;
  this.loader.stop();
}
}
