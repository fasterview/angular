import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrgService {

  org: any = null;  // Organiztion

  constructor(private _http: HttpClient, private _router: Router) { }

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

  /**
   * Get the submits for specified interview
   * 
   * @param id string | number
   */
  getInterview(id: number | string){
    return this._http.get(environment.url(`/api/interview/${id}/submits`));
  }


  get(id: number|string){
    return this._http.get(environment.url("api/organization/" + id));
  }

  /**
   * Add uesr to an organization
   */
  accept(user_id: number|string, interviewID){
    console.log(interviewID);
    return this._http.post(environment.url("/api/organization/" + this.org.id + "/user/" + interviewID), {
      user_id,
      status: "accepted"
    });
  }
  
  /**
   * Remove user from organization
   */
  reject(user_id: number|string, interviewID){
    return this._http.post(environment.url("/api/organization/" + this.org.id + "/user/" + interviewID), {
      user_id,
      status: "rejected"
    });
  }


  /**
   * Get all employees
   */
  employees(){
    return this._http.get(environment.url("api/organization/"+ this.org.id +"/users"));
  }

  toEmployees(){
    if(!this.org.is_owner){
      this._router.navigate(['/org', this.org.id, 'employees']);
      return true;
    }
  }

}
