import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InterviewService } from '../../interview.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  interview: any = null;
  hasAccess: boolean = false;  // If the app has access to user media or not
  stream: any = null; // Stream object

  @ViewChild("recordVideo") recordVideo;

  constructor(private _inter: InterviewService) { }

  ngOnInit(): void {
    // Get interview value
    this.interview = this._inter.getInterview();

    // Get access to user media
    this.getAccess();
  }

  /**
   * Get Access to the user media
   */
  async getAccess(){

    let constraints: any = {
      audio: true,
      video: true
    }
    
    navigator.mediaDevices
              .getUserMedia(constraints)
              .then( stream => {
                // Video element
                let video = this.recordVideo.nativeElement;

                this.stream = stream;

                // Use the stream for the video
                video.srcObject = this.stream;

                video.onloadedmetadata = function() {
                  video.play();
                  video.muted = true;
                };

                this.hasAccess = true;
              } )
              .catch( err => {
                console.log(err)
              })

  }


  /**
   * Start interview recording
   */
  start(){

  }


  /**
   * Strop recording
   */
  stop(){

  }

}
