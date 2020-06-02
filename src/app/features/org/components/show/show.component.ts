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

  constructor(private _org: OrgService, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    // Get organization id
    this.org = this._org.getOrg();
    
  }

}
