import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Sponsor } from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { SponsorDataService } from '../sponsor-data.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
  providers: [SponsorDataService, ConfirmationService]
})
export class VerificationComponent implements OnInit, OnDestroy {
  unsub$ = new Subject();

  submitting: boolean = false;
  loading: boolean = false;
  sponsorData : Sponsor;
  bankDetails : File;
  incorporationCertificate : File;
  selectedBankData = {
    base64BankImage : null,
    name : '',
    type : ''
  }
  selectedincorpCertificate = {
    base64incorpCertificateImage : null,
    name : "",
    type : ""
  }

  bankDetailsServer : any  = {};
  incorpServer : any = {}

  cities: any[] = [];
  categories: any[] = [];
  
  constructor(private router:Router, private ds: UserDataService, public ss: StateService, public ad:SponsorDataService, public loader: LoaderService, private cnfrm: ConfirmationService) { 
  }

  ngOnInit(): void {
    this.getCities();
    this.sponsorData=this.ad.getUserInfo();  
    console.log(this.sponsorData);
    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      this.sponsorData.email = session.email;
      this.getProfile();
      if(session.verificationStatus == 2) {

        this.confirm();
      }
    })
  }

  getProfile() {
    this.spinner();
    this.ad.get_profile().pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      this.stopSpin();
      if(response.status) {
        this.ad.sponsorData = response.data;
        this.sponsorData = this.ad.sponsorData;
        this.bankDetailsServer = response.data.bankDetails;
        console.log(this.bankDetailsServer);
        this.incorpServer = response.data.incorporationCertificate;
        console.log(this.bankDetailsServer);
      } else {
        this.ds.newMessage('error', 'Couldn\'t Fetch Record', response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)  
         this.ds.newMessage('error', 'Error Occured', "sorry some unknown error occured");
      else 
        this.ds.newMessage('error', 'Couldn\'t Fetch Record', `${error.status} : ${error.error.message}`);
      this.stopSpin();
    })
  }

  ngAfterViewInit() : void {
    this.bankDetails = this.ad.bankDetails;
    this.checkPreSelectBankDetails();
  }
  
  ngOnDestroy() : void {
    this.unsub$.next();
    this.unsub$.complete();
        // if(this.sponsorData.firstname && this.sponsorData.lastname && this.sponsorData.email && this.sponsorData.contactNo && this.sponsorData.age && this.sponsorData.DOB && this.sponsorData.Address && this.sponsorData.proving)
    // {
      
   // }  
  }
  
  getCities() {
    if(sessionStorage.getItem('cities')) {
      const cache = JSON.parse(sessionStorage.getItem('cities'));
      this.cities = cache.data.cities[0].allCities;
      this.categories = cache.data.sponsorCategories;
      return;
    } 
    this.spinner();
    this.ad.get_all_cities().pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      this.stopSpin();
      console.log(response.data);
      if(response.status) {
        this.cities = response.data.cities[0].allCities;
        this.categories = response.data.sponsorCategories;
        console.log(response.data);
        sessionStorage.setItem('cities',  JSON.stringify(response));
      } else {
        this.ds.newMessage('error', "Couldn't Fetch Cities", response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)  
         this.ds.newMessage('error', 'Error Occured', "sorry some unknown error occured");
      else 
        this.ds.newMessage('error', 'Couldn\'t Fetch Record', `${error.status} : ${error.error.message}`);
      this.stopSpin();
    })
  }

  selectCity(event) {
    const citySelect = event.target;
    this.sponsorData.city = citySelect.options[citySelect.selectedIndex].text;
    this.sponsorData.countryId = event.target.value;
  }
  
  selectCategory(event) {
    const categorySelect = event.target;
    this.sponsorData.categoryName = categorySelect.options[categorySelect.selectedIndex].text;
    this.sponsorData.categoryId = event.target.value;

  }


  submit(form){
    if(form.status == 'INVALID' || !this.sponsorData.city)
      return this.ds.newMessage('error', 'Incorrect Form', 'Please fill the form correctly')
    this.load();
    this.ad.incorporationCertificate = this.incorporationCertificate;
    this.ad.bankDetails = this.bankDetails;
    this.ad.sponsor_verification().pipe(takeUntil(this.unsub$)).subscribe((events)=>{
      if(events.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * events.loaded / events.total));
      } else if(events instanceof HttpResponse) {
      const response = events.body;
      this.stopload();
      if(response.status) {
        this.ds.newMessage('success', 'Details Submitted', response.message);
        this.ss.verificationStatusChange(1);
        this.router.navigate(['/sponsor']);
      } else {
        console.log(response);
        this.ds.newMessage('error', 'Couldn\'t Submit', response.message);
      }
    }}, (error)=> {
      if(error instanceof ErrorEvent)  
         this.ds.newMessage('error', 'Error Occured', "sorry some unknown error occured");
      else 
        this.ds.newMessage('error', 'Couldn\'t Submit', `${error.status} : ${error.error.message}`);
      this.stopload();
    });
  }


  selectBankDetails(event) {
    this.bankDetails = event.target.files[0];
    console.log(this.bankDetails)
    this.checkPreSelectBankDetails()
  }

  checkPreSelectBankDetails() {
      if(this.bankDetails && this.bankDetails.name != '') {
        this.selectedBankData.name = this.bankDetails.name,
        this.selectedBankData.type = this.bankDetails.type
        if(this.selectedBankData.type != 'application/pdf') {
          this.showThumbNail(this.bankDetails, (result) => this.selectedBankData.base64BankImage = result.currentTarget.result);
        } else {
          this.selectedBankData.base64BankImage = null
        }
      }
  }


  selectincorpCertificate(event) {
    this.incorporationCertificate = event.target.files[0];
    this.checkPreSelectincorpCertificateDetails();
  }

  checkPreSelectincorpCertificateDetails() {
    if(this.incorporationCertificate && this.incorporationCertificate?.name != '') {
      this.selectedincorpCertificate.type = this.incorporationCertificate.type;
      this.selectedincorpCertificate.name = this.incorporationCertificate.name;
      if(this.selectedincorpCertificate.type != 'application/pdf') {
        this.showThumbNail(this.incorporationCertificate, (result)=>this.selectedincorpCertificate.base64incorpCertificateImage = result.currentTarget.result);
      } else {
        this.selectedincorpCertificate.base64incorpCertificateImage = null
      }
    }
  }

  showThumbNail(file, callback) {
    const fileReader = new FileReader();
    fileReader.onload = callback;
    fileReader.onabort = () => console.log(fileReader.error);
    fileReader.readAsDataURL(file);
  }
  
  spinner() {
    this.submitting=true;
    this.loading= true;
  }
  stopSpin() {
    this.submitting = false;
    this.loading = false;
  }

  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }


  confirm() {
    console.log('yuuuuuu')
    this.cnfrm.confirm({
      message: 'You will have to verify again after updating your details. You will not be able to perform certain actions till you get verified. Continue?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        
      },
      reject: () => {
        this.router.navigate(['/sponsor']);
      }
    });
  }
}
