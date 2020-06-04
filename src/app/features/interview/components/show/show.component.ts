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
  isLoading: boolean = false;
  id: number | string = null;
  user: any = null;

  constructor(private _inter: InterviewService, private _route: ActivatedRoute, private _auth: AuthService) { }

  ngOnInit(): void {

    this.id = this._route.snapshot.params.id;
    
    this.isLoading = true;

    this._inter.get(this.id)
              .pipe(finalize( () => this.isLoading = false))
              .subscribe((res: any) => {
                this.interview = res.interview;
              });

    // Get user
    this._auth.user.subscribe( user => this.user = user);
    this.user = this._auth.getUser();
    
  }

}
