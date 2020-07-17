import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-preview-interview',
  templateUrl: './preview-interview.component.html',
  styleUrls: ['./preview-interview.component.scss'],
})
export class PreviewInterviewComponent implements OnInit, AfterViewInit {
  @Input('interview') interview: {
    video: string,
    cv_file: string,
    questions: { title: string; time: string | number }[]
  };

  @ViewChild('video') video: ElementRef;

  @Output('close') close: EventEmitter<any> = new EventEmitter<any>();

  currentIndex = 0;
  showQuestions: boolean = false;  // Show question with the video is loaded

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    let video = this.video.nativeElement;

    console.log(this.interview);
    
    video.src = this.interview.video;

    video.oncanplay = ()=>{
      video.controls = true;
      this.showQuestions = true;
    }

    let questions = this.interview.questions;
    video.addEventListener("timeupdate",()=>{

      for(let i = 0 ; i < questions.length - 1; i++){
        if(questions[i].time <= video.currentTime && questions[i + 1].time > video.currentTime){
          this.currentIndex = i;
        }
      }

      let last = questions.length - 1;

      if(questions[last].time <= video.currentTime){
        this.currentIndex = last;
      }

    })

  }

  /**
   * Emit close event
   */
  closePreview() {
    this.close.emit();
  }
}
