import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../services/org.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-show-interview',
  templateUrl: './show-interview.component.html',
  styleUrls: ['./show-interview.component.scss']
})
export class ShowInterviewComponent implements OnInit {

  isLoading: boolean = false;
  interviewId: number | string = null;  // Interview id
  interview: any = null;
  org: any = null;
  submits: any[] = [];

  showPreview: boolean = false; // Show interview preview
  interviewPreview: any = null;


  constructor(private _org: OrgService, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    if(this._org.toEmployees()){
      return;
    }

    this.interviewId = this._route.snapshot.params.interview;

    
    this.isLoading = true;
    this._org
        .getInterview(this.interviewId)
        .pipe(finalize(()=>{ this.isLoading = false; }))
        .subscribe((res: any) => {
          this.submits = res.submits.data;
          this.org = res.org;
          this.interview = res.interview;
        });
  }



  /**
   * Open interview preview
   * @param index number
   */
  openPreview(index: number){
    this.showPreview = true;
    this.interviewPreview = this.submits[index];
  }

  /**
   * Close interview preview
   */
  closePreview(){
    this.showPreview =false;
  }

}
