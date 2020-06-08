import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InterviewService } from '../../interview.service';

declare var MediaRecorder : any;  // Media record is not known by TS

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  interview: any = null;
  hasAccess: boolean = false;  // If the app has access to user media or not
  stream: any = null; // Stream object
  recorder: any;  // MediaRecorder for recording
  chunks: any[] = [];  // Recorded chunks
  blob: Blob; // The blob to by uplaoded to the API
  videoURL: any;  // Recorded video url object
  isRecording: boolean = false;  // True if the video is been recording
  recorded: boolean = false;  // True if recording precess is done
  currentIndex: number = 0;  // Current shown question index
  lastQuestion: boolean = false;  // True if the user in the last question



  @ViewChild("recordVideo") recordVideo;
  // @ViewChild("preview") previewVideo;

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
  getAccess(){

    let constraints: any = {
      audio: true,
      video: {
        facingMode: "user"
      }
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

                
                this.recorder = new MediaRecorder(this.stream);

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
    this.recorder.start();  // Start recording
    this.isRecording = true;


    /**
     * Define methods
     * 
     * I didn't choose "addEventListener" because there will be only on method
     * 
     */


    //  Push data chunks to the array
    this.recorder.ondataavailable = (e) => {
      this.chunks.push(e.data)
    }

    // Converted the recorded data to Blob and clear the chunks array
    // And generate url for preview 
    this.recorder.onstop = ()=>{
      // Convert the chunks to blob with video/mp4 type
      this.blob = new Blob(this.chunks, {'type': 'video/mp4'});

      this.chunks = [];

      this.videoURL = URL.createObjectURL(this.blob);

      this.recorded = true;
      this.isRecording = false;

      // this.previewVideo.nativeElement.src = this.videoURL;
    }
    
  }


  /**
   * Strop recording
   */
  stop(){
    this.recorder.stop(); // Stop recording
  }


  /**
   * Show the next question
   */
  next(){
    this.currentIndex++;

    if(this.currentIndex == this.interview.questions.length - 1){
      // Finish button
      this.lastQuestion = true;
    }

  }


  /**
   * Finish recording process
   * 
   * ======== Method Process ========
   * 1- Stop recording
   * 2- Close user media devices
   * 3- Clear/Reset properties values
   * 4- Set "recorded" property to true
   */
  finish(){
    
    // Stop recording
    this.stop();

    // Close user media devices
    this.stream.getTracks().forEach(track => {
      track.stop();
    })

    // Clear/Rest properties values
    this.hasAccess = false;
    this.stream = null;
    this.recorder = null;
    this.chunks = [];
    this.isRecording = false;
    this.currentIndex = 0;
    this.lastQuestion = false;


    // Set "recorded" property to true
    this.recorded = true;

  }



}
