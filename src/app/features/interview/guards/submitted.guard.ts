import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterviewService } from '../interview.service';

@Injectable({
  providedIn: 'root'
})
export class SubmittedGuard implements CanActivate {

  constructor(private _inter: InterviewService, private _router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      if(this._inter.getInterview()){
        console.log("Submitted Guard");
        
        if(this._inter.getInterview().submitted){
          this._router.navigate(['/interview', this._inter.getInterview().id]);
          return false;
        } 
        
        return true;
      }

    return new Promise((resolve, reject) =>{
      this._inter.isLoaded().subscribe((inter) => {
        console.log("Inteer", inter)
        if(inter.submitted){
          this._router.navigate(['/interview', this._inter.getInterview().id]);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
  
}
