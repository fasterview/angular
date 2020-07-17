import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  interview: any = null;
  interviewSubject: Subject<any> = new Subject<any>();

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
    this.interviewSubject.next(this.interview);
  }


  /**
   * Fetch interview data from the API
   */
  get(id: string | number){
    return this._http.get(environment.url("api/interview/" + id));
  }

  update(id: string | number, data){
    data._method= "PUT";
    return this._http.post( environment.url("api/interview/" + id), data);
  }

  /**
   * Fetch the interview again from the API
   */
  updated(){
    this.get(this.interview.id)
    .subscribe((res: any) => {
      this.interview = res.interview;

      // Add the interview to the service
      this.setInterview(this.interview);
    });
  }

  /**
   * Delete interview
   */
  delete(){
    return this._http.delete(environment.url("/api/interview/" + this.interview.id));
  }


  submit(data){
    return this._http.post(environment.url("api/interview/" + this.interview.id + "/submit"), data, {
      reportProgress: true,
      observe: "events"
    });
  }

}
