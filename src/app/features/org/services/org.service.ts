import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(private _http: HttpClient) { }


  /**
   * Create new organization request
   * @param body 
   */
  create(body: {name: string}){
    return this._http.post(environment.url('api/organization'), body);
  }
}
