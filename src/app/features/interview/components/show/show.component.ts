import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../interview.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  interview: any = null;
  user: any = null;
  url: string = "";
  hide: boolean = false;

  constructor(private _inter: InterviewService, private _auth: AuthService) { }

  ngOnInit(): void {

    this.interview = this._inter.getInterview();

    this._inter.interviewSubject.subscribe((interview)=>{
      this.interview = interview;
      
      console.log(this.interview.org.user_id, this._auth.getUser().id);
      if(this.interview.org.user_id != this._auth.getUser().id && !this.interview.active){
        this.hide = true;
      }
    });

    console.log(this.interview.org.user_id, this._auth.getUser().id);
      if(this.interview.org.user_id != this._auth.getUser().id && !this.interview.active){
        this.hide = true;
      }

    // Get user
    this._auth.user.subscribe( user => this.user = user);
    this.user = this._auth.getUser();
    
    // Get full URL
    this.url = window.location.href;
  }

}
