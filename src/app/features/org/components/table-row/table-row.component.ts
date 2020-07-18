import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrgService } from '../../services/org.service';
import { finalize } from 'rxjs/operators';
import { NotifyService } from 'src/app/core/services/notify.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {

  isLoading: boolean = false;

  @Input("s") s: any;
  @Input("hideRole") hideRole: boolean = false;
  @Output("showInterview") showInterview: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _org: OrgService, private _notify: NotifyService) { }

  ngOnInit(): void {
  }

  show(){
    this.showInterview.emit();
  }

  accept(){
    this.isLoading = true;
    this._org.accept(this.s.user_id, this.s.interview_id)
            .pipe(finalize(()=>{this.isLoading = false;}))
            .subscribe(()=>{
              this._notify.success("Done 👍", "User accepted successfully")
              this.s.status = "accepted";
            });
  }

  reject(){
    this.isLoading = true;
    this._org.reject(this.s.user_id, this.s.interview_id)
            .pipe(finalize(()=>{this.isLoading = false;}))
            .subscribe(()=>{
              this._notify.success("Done 👍", "User got rejected");
              this.s.status = "rejected";
            });
  }

}
