import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrgService } from '../../../services/org.service';
import { finalize } from 'rxjs/operators';
import { NotifyService } from 'src/app/core/services/notify.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input("user") user: any;
  @Input("index") index: number;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();

  org: any = null;
  isLoading: boolean = false;

  constructor(private _org: OrgService, private _notify: NotifyService) { }

  ngOnInit(): void {
    this.org = this._org.org;
  }

  remove(){
    if(!confirm("Are your sure you wnat to remove this user?")){
      return;
    }
    
    this.isLoading = true;

  }

  reject(){
    this.isLoading = true;
    this._org.rejectOrg(this.user.id)
            .pipe(finalize(()=>{this.isLoading = false;}))
            .subscribe(()=>{
              this._notify.success("Done 👍", "User got rejected");
              this.refresh.emit();
            });
  }

}
