import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency, ServerResponse } from '../services/dataModels';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any'
})
export class AgencyDataService {

  baseURL = environment.server;
  agencyData : Agency;
  incorporationCertificate : File;
  bankDetails : File;
  getUserInfo(){
    return this.agencyData;
  }
  setUserInfo(value){
      this.agencyData=value;
  }

  constructor(private http: HttpClient) {
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
  
  get_all_cities() : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/layout/all-cities`, {withCredentials: true});
  }
  agency_verification() : Observable<any>{
    const formData = new FormData();
    formData.append('incorporationCertificate', this.incorporationCertificate);
    formData.append('bankDetails', this.bankDetails);
    formData.append('data', JSON.stringify(this.agencyData));
    return this.http.post(`${this.baseURL}/users/agency/verification`, formData, {withCredentials: true, reportProgress: true, observe: 'events'});
  }

  get_profile() : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/users/agency/profile`, {withCredentials: true})
  }
}
