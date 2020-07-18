import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../services/org.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  isLoading: boolean = false;
  users: any[] = [];
  org: any = null;

  constructor(private _org: OrgService) { }

  ngOnInit(): void {

    this.org = this._org.org;
    
    this.isLoading = true;
    this._org.employees()
              .pipe(finalize(()=>{this.isLoading = false;}))
              .subscribe((res: any)=>{
                this.users = res.data;
                console.log(res);
              });


  }

}
