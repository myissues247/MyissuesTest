import { Injectable } from '@angular/core';
import { ServerResponse } from '../../services/dataModels';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SponsorDataService {
  baseURL = environment.server;
  constructor(private http : HttpClient) { }

  get_bumps() : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/users/bumps`, {withCredentials: true});
  }

  purchase_bump_up(data) : Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseURL + '/users/sponsors/bumps/purchase/' + data.bumpId , data, {withCredentials: true});
  }

  purchase_bump_up_with_bal(data) : Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseURL + '/users/sponsors/bumps/purchase/balance/' + data.bumpId , data, {withCredentials: true});
  }
  
  bumpAd(adId) : Observable<ServerResponse>{
    return this.http.put<ServerResponse>(`${this.baseURL}/users/sponsors/ads/${adId}/bump`, {}, {withCredentials: true});
  }
  getGlobalStates(code) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/layout/globe/country/${code}/states`, {withCredentials:true})
  }

  getGlobalCities(code, state) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/layout/globe/country/${code}/state/${state}/cities`, {withCredentials:true});
  }
}
