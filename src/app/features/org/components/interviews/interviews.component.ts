import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../interview/interview.service';
import { OrgService } from '../../services/org.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {

  isLoading: boolean = false;
  interviews: any[] = [];
  org: any = null;

  constructor(private _inter: InterviewService, private _org: OrgService) { }

  ngOnInit(): void {

    this.org = this._org.org;

    this.isLoading = true;
    console.log("ID:", this._org.org.id);
    this._inter.getAll(this._org.org.id)
                .pipe(finalize(()=>{ this.isLoading = false}))
                .subscribe((res: any) => {
                  this.interviews = res.data;
                })
  }

}
