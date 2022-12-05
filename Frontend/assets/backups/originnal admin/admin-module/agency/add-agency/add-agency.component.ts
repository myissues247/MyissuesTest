import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { Agency } from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
// import { AgencyDataService } from '../agency-data.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit, OnDestroy  {

  submitting: boolean = false;
  loading: boolean = false;
  agencyData : Agency;
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
  
  action : string = "";
  agencyId : string = "";
  constructor(private router:Router, private ds: UserDataService, public ss: StateService, public ad:AdminDataService, public loader: LoaderService, public ar: ActivatedRoute) { 
    this.agencyData={
      agencyTitle : "",
      countryId: "",
      city : "",
      categoryId: "",
      categoryName : "",
      address :"",
      websiteURL : "",
      officePhone : "",
      fax : "", 
      email : "",
      serviceContact : "",
      boundaries : "",
      hours : "",
      eligibility : "",
      services : "",
      GST : "",
      fees : null,
      howToApply: "",
      legalStatus: "",
      listingCopyRightTitle: "",
      listingCopyRightURL: "",
      physicalAccess : "",
    } 
  }

  ngOnInit(): void {
    this.getCities();
    
    const edit = this.ar.snapshot.paramMap.get('edit');
    if(edit == 'edit') {
      const agencyId = this.ar.snapshot.paramMap.get('agencyId');
      if(!agencyId){
       this.ds.newMessage('error', 'No Agency Selected', 'Please select a Agency to edit');
       this.router.navigate(['/admin-module/agency']);
      } 
      this.action = "edit";
      this.agencyId = agencyId;
      this.getProfile(this.agencyId);
    }
  }

  
  ngOnDestroy() : void {
  }

  getProfile(agencyId) {
    this.spinner();
    this.ad.get_profile(agencyId).subscribe((response)=>{
      this.stopSpin();
      if(response.status) {
        this.agencyData = response.data;
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
  
  getCities() {
    if(sessionStorage.getItem('cities')) {
      const cache = JSON.parse(sessionStorage.getItem('cities'));
      this.cities = cache.data.cities[0].allCities;
      this.categories = cache.data.agencyCategories;
      return;
    } 
    this.spinner();
    this.ad.get_all_cities().subscribe((response)=>{
      this.stopSpin();
      console.log(response.data);
      if(response.status) {
        this.cities = response.data.cities[0].allCities;
        this.categories = response.data.agencyCategories;
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
    this.agencyData.city = citySelect.options[citySelect.selectedIndex].text;
    this.agencyData.countryId = event.target.value;
  }
  
  selectCategory(event) {
    const categorySelect = event.target;
    this.agencyData.categoryName = categorySelect.options[categorySelect.selectedIndex].text;
    this.agencyData.categoryId = event.target.value;
  }


  submit(form){
    if(form.status == 'INVALID' || !this.agencyData.city)
      return this.ds.newMessage('error', 'Incorrect Form', 'Please fill the form correctly')
    this.load();
    this.agencyData;
    const data = {
      "agencyData" : this.agencyData,
      "incorporationCertificate" : this.incorporationCertificate,
      "bankDetails" : this.bankDetails
    }
    this.ad.agency_verification(data, this.agencyId).subscribe((events)=>{
      if(events.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * events.loaded / events.total));
      } else if(events instanceof HttpResponse) {
      const response = events.body;
      this.stopload();
      if(response.status) {
        this.ds.newMessage('success', 'Agency Added', response.message);
        this.router.navigate(['/admin-module/agency']);
      } else {
        console.log(response);
        this.ds.newMessage('error', 'Couldn\'t Add', response.message);
      }
    }}, (error)=> {
      if(error instanceof ErrorEvent)  
         this.ds.newMessage('error', 'Error Occured', "sorry some unknown error occured");
      else 
        this.ds.newMessage('error', 'Couldn\'t Add', `${error.status} : ${error.error.message}`);
      this.stopload();
    });
  }


  selectBankDetails(event) {
    this.bankDetails = event.target.files[0];
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
}
