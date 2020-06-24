import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss']
})
export class CopyComponent implements OnInit {

  @Input("text") text: string;
  @ViewChild("input", {static: true}) input: ElementRef;

  constructor() { }

  ngOnInit(): void {
    console.log(this.input);
    this.input.nativeElement.value = this.text;
  }

  copy(){
    const el = document.createElement('textarea');
    el.value = this.text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

}
