import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }


  /**
   * Update user settings
   * @param data any
   */
  settings(data: any){
    return this._http.post(environment.url("/api/settings"), data);
  }


  /**
   * Change user password
   * @param data any
   */
  changePassword(data: any){
    return this._http.post(environment.url("/api/change-password"), data);
  }

}
