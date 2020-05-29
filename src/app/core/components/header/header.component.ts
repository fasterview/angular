import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // isLogged: boolean = false;
  user: any = null;
  
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    // Subscribe to user object
    this._auth.user.subscribe(user => {
      this.user = user;
    })
    this.user = this._auth.getUser();
  }

  /**
   * Log the user out
   */
  logout(){
    this._auth.logout();
  }

}
