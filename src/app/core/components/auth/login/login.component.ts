import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from "rxjs/operators";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  loginForm: FormGroup;
  wrongInfo: boolean = false;

  constructor(private _http: HttpClient, private _auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl("", {validators: [Validators.required, Validators.email],}),
      "password": new FormControl("", {validators: [Validators.required, Validators.minLength(6)]}),
    });
  }

  /**
   * Log the user in using email and password
   */
  login(){
    let username = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    this.isLoading = true;

    this._http.post(environment.url("oauth/token"), {
      username,
      password,
      grant_type: "password",
      "client_id": environment.client_id,
      "client_secret": environment.client_secret
    }).pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    ).subscribe(
      (res: {access_token: string})=>{
        this._auth.login(res.access_token, true);
      },
      (err)=>{
        this.wrongInfo = err.error?.error ? this.loginForm.value.email : "";
      }
    )
    
  }

}
