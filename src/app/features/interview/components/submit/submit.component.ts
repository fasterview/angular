import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InterviewService } from '../../interview.service';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { NotifyService } from 'src/app/core/services/notify.service';

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
  allowNext: boolean = false;  // True if the question was displayed atleast 30 seconds
  nextTimeout: any = null;  // Move to next question timeout
  showPreview: boolean = false; // Show and hide preview

  fileName: string = "";  // CV file name
  fileError: string = "";  // Wrong file format
  @ViewChild("cv", {static: true}) cv: ElementRef;
  cvFile: File = null;

  uploaded: number = 0; // Uploaded value

  form: FormGroup;

  interviewPreview: {video: string, questions: {title: string, time: string | number}[]} = {
    video: "",
    questions: []
  }; // Recorded interview data to preview



  @ViewChild("recordVideo") recordVideo;
  @ViewChild("progress") progress;
  // @ViewChild("preview") previewVideo;

  constructor(private _inter: InterviewService, 
              private _router: Router, 
              private _notify: NotifyService) { }

  ngOnInit(): void {
    // Get interview value
    this.interview = this._inter.getInterview();

    // Redirect back if this interview is submitted
    if(this.interview.submitted){
      this._router.navigate(['/interview', this.interview.id]);
    }

    // Get access to user media
    this.getAccess();

    // Intialize the form
    this.form = new FormGroup({
      "questions": new FormArray([], {validators: [Validators.required]}),
      video: new FormControl("")
    });

    // Upload file
    if(this.interview.require_cv){
      this.cv.nativeElement.addEventListener("change", ()=>{
        if(this.cv.nativeElement.files.length){
          
          let file = this.cv.nativeElement.files[0];
          let split = file.name.split(".");
          console.log(this.cv.nativeElement.files);
          console.log(split[split.length - 1]);
          if(split.length > 0 && split[split.length - 1] == "pdf"){
            // Validate
            this.fileName = file.name;
            this.cvFile = file;
            this.fileError = "";
          } else {
            this.fileName = "";
            this.cvFile = null;
            this.fileError =  "Wrong file format, Only pdf files are allowed";
          }
          
        }
      });
    }
    
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
      
      // Store the blob object in a file
      this.form.value.video = this.blob;

      this.chunks = [];

      this.videoURL = URL.createObjectURL(this.blob);
      this.interviewPreview.video = this.videoURL;

      this.recorded = true;
      this.isRecording = false;

      // this.previewVideo.nativeElement.src = this.videoURL;
    }


    // Allow after 30 seconds
    this.allowNext = false;
    setTimeout(()=>{
      this.allowNext = true;
    }, 5 * 1000); 

    // Go to next qusetion timeout
    this.nextTimeout = setTimeout(()=>{ 
      this.next();
    }, this.interview.questions[this.currentIndex].time * 1000 * 60);
    
    this.switchClass();
    

    this.createInput(0);

    if(this.currentIndex == this.interview.questions.length - 1){
      // Finish button
      this.lastQuestion = true;
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
    // Clear timeout
    clearTimeout(this.nextTimeout);

    if(this.currentIndex == this.interview.questions.length - 1){
      // Finish button
      this.lastQuestion = true;

      // Go the next question automatically after the qeustion time ended
      this.nextTimeout = setTimeout(()=>{
        this.finish();
      }, this.interview.questions[this.currentIndex].time * 1000 * 60);
    } else {
      // Go the next question automatically after the qeustion time ended
      this.nextTimeout = setTimeout(()=>{ 
        this.next();
      }, this.interview.questions[this.currentIndex].time * 1000 * 60);

    }


    // Allow the user to click next/finish button after 30 seconds
    this.allowNext = false;
    setTimeout(()=>{
      this.allowNext = true;
    }, 1 * 1000); 

    this.switchClass();


    // Add form input
    this.createInput();

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

    if(this.recorded) return;
    
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

   /**
   * Create questions form control and add it
   */
  createInput(time = null){

    time = time ? time : parseInt(this.recordVideo.nativeElement.currentTime);

    (this.form.get("questions") as FormArray).push(new FormGroup({
      time: new FormControl(time)
    }))

    // Add data to preview
    this.interviewPreview.questions.push({
      time: time,
      title: this.interview.questions[this.currentIndex].title
    })
  }


  /**
   * Switch class on progress bar
   */
    switchClass(){
      this.progress.nativeElement.style.transitionDuration = "0s";
      this.progress.nativeElement.style.width = "0%";
      setTimeout(()=>{
        this.progress.nativeElement.style.transitionDuration = (this.interview.questions[this.currentIndex].time * 60) +'s';
        this.progress.nativeElement.style.width = "100%";
      }, 10)
    }


    /**
     * Submit the form
     */
    submit(){
      
      let fd = new FormData();
      let value = this.form.value;

      for(let i = 0; i < value.questions.length; i++){
        console.log(value.questions[i]);
        fd.append("questions[" + i + "][time]", value.questions[i].time)
      }

      // File
      fd.append("video", this.blob, "video.mp4");
      if(this.interview.require_cv){
        fd.append("cv", this.cvFile);
      }
      console.log(this.blob.type);

      this._inter.submit(fd)
                .subscribe(
                  (event: any) => {
                    // Upload progress
                    if (event.type == HttpEventType.UploadProgress) {
                      this.uploaded = parseInt(((event.loaded / event.total) * 100).toString());
                      return;
                    } else if (event.type == HttpEventType.Response) {
                      // Redirect the user to the profile page
                      this._notify.success("Congratulation 🤩", "The interview submitted successfully");
                      this._router.navigate(['/profile']);
                    }
                  })
                
    }


    /**
     * Open preview component
     */
    preview(){
      this.showPreview = true;

      console.log(this.interviewPreview);
      

    }


    /**
     * Open preview component
     */
    closePreview(){
      this.showPreview = false;
    }



}
