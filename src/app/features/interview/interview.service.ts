import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private _http: HttpClient) { }

  /**
   * Fetch interview data from the API
   */
  get(id: string | number){
    return this._http.get(environment.url("api/interview/" + id));
  }
}
