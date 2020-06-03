import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../../services/org.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { InterviewService } from '../../interview.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  org: any = null;
  createForm: FormGroup;
  isLoading: boolean = false;

  constructor(private _org: OrgService, private _inter: InterviewService) { }

  ngOnInit(): void {
    
    // Get org value
    this.org = this._org.getOrg();
    
    // Intizlize the form
    this.createForm = new FormGroup({
      role: new FormControl("", {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]}),
      questions: new FormArray([], {validators: Validators.required}),
    });

    this.createQuestion();
  }

  /**
   * Create new question input (title, time) if the array is valid
   */
  createQuestion(){

    if(     this.createForm.get('questions').invalid 
        && (this.createForm.get('questions') as FormArray).length > 0){
          return;
        } 


    let question = new FormGroup({
      title: new FormControl("", {validators: [Validators.required, Validators.minLength(8), Validators.maxLength(100)]}),
      time: new FormControl(1, {validators: [Validators.required, Validators.min(1), Validators.max(5)]}),
    });

    (<FormArray>this.createForm.get("questions")).push(question);
  }

  /**
   * Remove question from the array
   */
  deleteQuestion(index: number){
    (<FormArray>this.createForm.get("questions")).removeAt(index);
  }

  /**
   * - Submit the form
   * - Create new interview
   * 
   */
  submit(){
    this.isLoading = true;

    this._inter.create(this.org.id, this.createForm.value)
                .pipe(finalize(()=>{ this.isLoading = false; }))
                .subscribe((res)=>{
                  console.log(res);
                })
  }

}
