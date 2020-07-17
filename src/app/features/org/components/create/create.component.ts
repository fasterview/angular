import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrgService } from '../../services/org.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/notify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  isLoading: boolean = false;

  constructor(private _org: OrgService, 
              private _router: Router, 
              private _notify: NotifyService) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl("", {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)]})
    });
  }


  /**
   * Submit create form
   */
  submit(){
    console.log("submit");
    this.isLoading = true;
    this._org.create(<{name: string}>this.createForm.value)
            .pipe(finalize(()=>{this.isLoading = false}))
            .subscribe((res)=>{
              this._notify.success("Congratulation 🤩", "The organization created successfully");
              this._router.navigate(['/profile']);
            })
  }

}
