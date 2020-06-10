import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  interview: any = null;

  constructor(private _http: HttpClient) { }


  /**
   * Return a copy of interview object
   */
  getInterview(){
    return this.interview ? {...this.interview} : null;
  }

  /**
   * Set interview value
   */
  setInterview(inter: any){
    this.interview = inter;
  }


  /**
   * Fetch interview data from the API
   */
  get(id: string | number){
    return this._http.get(environment.url("api/interview/" + id));
  }


  submit(data){
    return this._http.post(environment.url("api/interview/" + this.interview.id + "/submit"), data);
  }

}
