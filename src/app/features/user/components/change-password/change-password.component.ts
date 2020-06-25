import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  oldSentPassword: string = "€"; // That a letter that user can't type

  constructor(private _user: UserService, private _router: Router) { }

  ngOnInit(): void {

    // Intialize the form
    this.form = new FormGroup({
      old_password: new FormControl("", {validators: [Validators.required]}),
      new_password: new FormControl("", {validators: [Validators.required, Validators.minLength(6)]}),
      new_password_confirmation: new FormControl("", {validators: [Validators.required, this.confirm.bind(this)]}),
    });
    
  }


  /**
   * Submit change password form
   */
  submit(){
    this.loading = true;

    this._user.changePassword(this.form.value)
              .pipe(finalize( () => { this.loading = false; } ))
              .subscribe(
                (res) => {
                    this._router.navigate(["/profile"]);
                }, 
                (err: any) => {
                  console.log(err);
                  if(err.status == 401){
                    this.oldSentPassword = this.form.value.old_password;
                  }
                }
              );

  }


  /**
   * Confirm password validator
   */
  confirm(control: FormControl): { [key: string]: boolean } | null {
    if(!this.form) return null;

    if (control.value !== this.form.get("new_password").value) {
        return { 'confirm': true };
    }
    return null;

  }

}
