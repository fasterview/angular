import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean = false;
  registerForm: FormGroup;
  usedEmail: boolean = false;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl("", {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)]}),
      email: new FormControl("", {validators: [Validators.required, Validators.email]}),
      password: new FormControl("", {validators: [Validators.required, Validators.minLength(6)]}),
      password_confirmation: new FormControl("", {validators: [Validators.required]}),
    });
  }

  /**
   * Register the user
   */
  register(){

    let value = this.registerForm.value;

    let name = value.name;
    let email = value.email;
    let password = value.password;
    let password_confirmation = value.password_confirmation;

    this.isLoading = true;

    this._http.post(environment.url("api/oauth/register"), {
      name,
      email,
      password,
      password_confirmation,
    }).subscribe(
      (res)=>{
        console.log(res);
      },
      (err)=>{
        console.log(err);

        this.usedEmail = !!err.error?.errors?.email ? email : false;
        this.isLoading = false;
      },
      ()=>{this.isLoading = false;}
    )

  }

}
