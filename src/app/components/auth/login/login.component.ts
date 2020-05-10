import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(private _http: HttpClient) { }

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
    let {email, password} = {...this.loginForm.value};

    this.isLoading = true;

    this._http.post(environment.url("oauth/token"), {
      username: email,
      password,
      grant_type: "password",
      "client_id": environment.client_id,
      "client_secret": environment.client_secret
    }).subscribe(
      (res)=>{
        console.log(res);
      },
      (err)=>{
        console.log(err);
      },
      ()=>{ this.isLoading = false }
    )
    
  }

}
