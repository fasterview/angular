import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewService } from '../../interview.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotifyService } from 'src/app/core/services/notify.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  interview: any = null;
  org: any = null;
  updateForm: FormGroup;
  isLoading: boolean = false;


  constructor(private _inter: InterviewService, 
              private _router: Router, 
              private _auth: AuthService,
              private _notify: NotifyService) { }

  ngOnInit(): void {
    // Check if the current user is the owner
    this.interview = this._inter.getInterview();
    this.org = this.interview.org;

    if( !this.interview?.org?.user_id ||
        this.interview?.org?.user_id != this._auth.getUser().id){
          this._router.navigate(['/interview', this.interview.id]);
    }

    // Intizlize the form
    this.init();
  }

  /**
   * Intialize the form
   */
  init(){
    this.updateForm = new FormGroup({
      role: new FormControl(this.interview.role, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]}),
      description: new FormControl(this.interview.description, {validators: [Validators.minLength(20), Validators.maxLength(400)]}),
      require_cv: new FormControl(this.interview.require_cv ? "require" : ""),
      active: new FormControl(this.interview.active ? "active" : ""),
      questions: new FormArray([], {validators: Validators.required}),
    });

    for(let i = 0; i < this.interview.questions.length; i++){
      this.createQuestion(this.interview.questions[i].title, this.interview.questions[i].time);
    }
  }
  

  /**
   * Create new question input (title, time) if the array is valid
   */
  createQuestion(title: string = "", time: string | number = 1){

    if(     this.updateForm.get('questions').invalid 
        && (this.updateForm.get('questions') as FormArray).length > 0){
          return;
        } 


    let question = new FormGroup({
      title: new FormControl(title, {validators: [Validators.required, Validators.minLength(8), Validators.maxLength(100)]}),
      time: new FormControl(time, {validators: [Validators.required, Validators.min(1), Validators.max(5)]}),
    });

    (<FormArray>this.updateForm.get("questions")).push(question);
  }

  /**
   * Remove question from the array
   */
  deleteQuestion(index: number){
    (<FormArray>this.updateForm.get("questions")).removeAt(index);
  }

  /**
   * Submit the form
   */
  submit(){
    this.isLoading = true;

    this._inter.update(this.interview.id, this.updateForm.value)
                .pipe(finalize(()=>{ this.isLoading = false; }))
                .subscribe((res: any)=>{
                  // Redirect the uesr to vew interview page
                  this._notify.success("Congratulation 🤩", "The interview updated successfully");
                  this._router.navigate(['/interview/' + res.interview.id]);
                  this._inter.updated();
                })
  }

  /**
   * Delete the interview
   */
  delete(){
    if(!confirm(`Are you sure you wnat to delete "${this.interview.role}" interview \nAll interviews will be deleted`)){
      return;
    }

    this.isLoading = true;

    this._inter.delete()
                .pipe( finalize(()=> { this.isLoading = false; }) )
                .subscribe(()=>{
                  this._router.navigate(['/org', this.interview.org.id])
                })

  }

}
