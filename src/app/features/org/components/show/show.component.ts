import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../services/org.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

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
                console.log(this.org);
            })
    
  }

}
