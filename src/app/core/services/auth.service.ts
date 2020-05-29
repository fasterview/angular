import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  state: Subject<boolean> = new Subject<boolean>(); // To omit the state changes
  user: Subject<Object> = new Subject<Object>();

  private logged: boolean = false;
  private access_token: string = '';
  private userObj: any = null;

  constructor(private _router: Router, private _http: HttpClient) {
    let access_token = localStorage.getItem('access_token');
    if (access_token) {
      // Log the user in
      this.logged = true;
      setTimeout(() => {
        this.login(access_token);
        this.storeUser(JSON.parse(localStorage.getItem('user')));
      }, 0);
    }
  }

  /**
   * Store the access token and fetch the user data
   * Then redirect the user to homepage
   *
   * @param access_token
   */
  login(access_token) {
    localStorage.setItem('access_token', access_token);
    this.access_token = access_token;
    this.changeState(true);

    // Fetch user data in all cases to Make sure
    // That the user data is up-to-date
    this.fetchUser();

    this._router.navigate(['/']);
  }

  /**
   * Clear localStorage then redirect the user to home page
   */
  logout() {
    localStorage.clear();
    this.access_token = '';
    this.changeState(false);
    this.storeUser(null);

    this._router.navigate(['/']);
  }

  /**
   * Return access token
   */
  getToken() {
    return this.access_token;
  }

  /**
   * Return a copy of user object
   */
  getUser() {
    return this.userObj ? { ...this.userObj } : null;
  }

  /**
   * Return logged value
   */
  isLogged(): boolean {
    return this.logged;
  }

  /**
   * Change logged value then omit the new value to listeners
   * @param state
   */
  private changeState(state: boolean) {
    this.logged = state;
    this.state.next(this.logged);
  }

  /**
   * Fetch user logged data
   */
  private fetchUser() {
    this._http.get(environment.url('api/me')).subscribe(
      (res) => {
        this.storeUser(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Store user and emit it for listeners
   */
  private storeUser(user) {
    this.userObj = user;
    this.user.next(this.userObj);

    if (user) {
      localStorage.setItem('user', JSON.stringify(this.userObj));
    }
  }
}
