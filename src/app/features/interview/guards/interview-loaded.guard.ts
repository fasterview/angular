import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InterviewService } from '../interview.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewLoadedGuard implements CanActivateChild {

  constructor(private _inter: InterviewService){}
  
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let result = this._inter.isLoaded();

      console.log(result);
      console.log(this._inter.getInterview());

    // return this._inter.isLoaded();
    return new Promise((resolve, reject) => {
      console.log("START");
      setTimeout(()=>{
        console.log("END");
        resolve(true)
      }, 4000);
    });
  }
  
}
