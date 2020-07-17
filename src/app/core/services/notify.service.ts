import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private _notfication: NotificationsService) { }

  success(title: string = "", content: string = "" ){
    this._notfication.success(title, content, {
      position: ["top", "left"],
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickIconToClose: true,
      theClass: "bg-dark text-white",
      animate: "fromRight",
    });
  }
  
}
