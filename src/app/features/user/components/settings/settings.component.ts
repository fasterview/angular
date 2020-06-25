import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  user: any = null;
  fileError: string = "";

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.user = this._auth.getUser();

    this.form = new FormGroup({
      name: new FormControl(this.user.name, {validators: [Validators.required, Validators.min(3)]})
    });
  }

}
