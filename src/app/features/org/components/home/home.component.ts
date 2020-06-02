import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import { OrgService } from '../../services/org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = false;
  id: number | string = null;  // Organization's id
  org: any = null;

  constructor(private _org: OrgService, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    // Get organization id
    this.id = this._route.snapshot.params.id;

    this.isLoading = true;

    this._org.get(this.id)
            .pipe(finalize(()=>{this.isLoading = false}))
            .subscribe((res: {org: any})=>{
                this.org = res.org;
                // Store org value in the servcie
                this._org.setOrg(this.org);
            })
    
  }

}
