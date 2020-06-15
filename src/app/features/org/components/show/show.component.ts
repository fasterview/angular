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

  org: any = null;
  submits: any[] = [];

  constructor(private _org: OrgService, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    // Get organization id
    this.org = this._org.getOrg();

    // Get latest submits for this org
    this._org.submits().subscribe((res: any) => {
      this.submits = res.data;
    });
  }

}
