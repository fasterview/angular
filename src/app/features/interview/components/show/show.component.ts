import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../interview.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  interview: any = null;
  user: any = null;

  constructor(private _inter: InterviewService, private _auth: AuthService) { }

  ngOnInit(): void {

    this.interview = this._inter.getInterview();

    // Get user
    this._auth.user.subscribe( user => this.user = user);
    this.user = this._auth.getUser();
    
  }

}
