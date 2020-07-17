import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private _http: HttpClient) { }

  create(id: number, body: any){
    return this._http.post(environment.url("/api/" + id + "/interview"), body);
  }

  getAll(id: number){
    return this._http.get(environment.url("api/organization/"+ id +"/interviews"));
  }
}
