import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../interview.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  interview: any = null;
  isLoading: boolean = false;
  id: number | string = null;

  constructor(private _inter: InterviewService, private _route: ActivatedRoute, private _auth: AuthService) { }

  ngOnInit(): void {

    this.id = this._route.snapshot.params.id;
    
    this.isLoading = true;

    this._inter.get(this.id)
              .pipe(finalize( () => this.isLoading = false))
              .subscribe((res: any) => {
                this.interview = res.interview;

                // Add the interview to the service
                this._inter.setInterview(this.interview);
              });
    
  }

}
