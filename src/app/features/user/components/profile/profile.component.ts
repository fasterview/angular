import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = null;
  comps = [];
  loaded: boolean = false;

  constructor(private _auth: AuthService, private _http: HttpClient) { }

  ngOnInit(): void {
    
    this._auth.user.subscribe(user => { this.user = user });
    this.user = this._auth.getUser();

    // Fetch user company
    this.fetchCompany();
  }


  /**
   * Fetch the companies that user works on
   */
  fetchCompany(){
    this._http.get(environment.url("api/organization"))
        .subscribe((res: any) => {
          this.comps = res.organizations
          this.loaded = true;
        });
  }


}
