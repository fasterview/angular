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
  showPreview: boolean = false; // Show or hide interview preview component
  interview = null;

  constructor(private _org: OrgService, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    if(this._org.toEmployees()){
      return;
    }  

    // Get organization id
    this.org = this._org.getOrg();

    // Get latest submits for this org
    this._org.submits().subscribe((res: any) => {
      this.submits = res.data ? res.data : [];
    });
  }

  /**
   * Show interview video
   */
  showInterview(index: number){
    this.interview = this.submits[index];
    this.showPreview = true;
  }

  /**
   * Close interview preview
   */
  closeInterview(){
    this.showPreview = false;
  }

}
