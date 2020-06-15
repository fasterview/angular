import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class OrgService {

  org: any = null;  // Organiztion

  constructor(private _http: HttpClient) { }

  /**
   * Set org value
   */
  setOrg(org: any){
    this.org = org;
  }

  /**
   * Return the "org" value
   */
  getOrg(){
    return this.org;
  }


  /**
   * Create new organization request
   * @param body 
   */
  create(body: {name: string}){
    return this._http.post(environment.url('api/organization'), body);
  }


  /**
   * Get submits for current org
   */
  submits(){
    return this._http.get(environment.url("api/organization/" + this.org.id + "/submits"));
  }


  get(id: number|string){
    return this._http.get(environment.url("api/organization/" + id));
  }
}
