import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sponsor, ServerResponse } from '../services/dataModels';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SponsorDataService {

  baseURL = environment.server;
  sponsorData : Sponsor;
  incorporationCertificate : File;
  bankDetails : File;
  getUserInfo(){
    return this.sponsorData;
  }
  setUserInfo(value){
      this.sponsorData=value;
  }

  constructor(private http: HttpClient) {
    this.sponsorData={
      sponsorTitle : "",
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
  
  
  sponsor_verification() : Observable<any>{
    const formData = new FormData();
    formData.append('incorporationCertificate', this.incorporationCertificate);
    formData.append('bankDetails', this.bankDetails);
    formData.append('data', JSON.stringify(this.sponsorData));
    return this.http.post(`${this.baseURL}/users/sponsor/verification`, formData, {withCredentials: true, reportProgress: true, observe: 'events'});
  }

  get_profile() : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/users/sponsors/profile`, {withCredentials: true})
  }

  get_all_cities() : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/layout/all-cities`, {withCredentials: true});
  }
}
