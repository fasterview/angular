import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClassOnClick]'
})
export class ClassOnClickDirective {

  @Input("appClassOnClick") class: string;

  constructor(private _el: ElementRef) { }

  @HostListener("document:click", ["$event"])
  clicked(e){
    // Clicking in inside the element
    if(e.target === this._el.nativeElement || this._el.nativeElement.contains(e.target)){
      this._el.nativeElement.classList.toggle(this.class);
    } else {  // Clicking outside the element
      this._el.nativeElement.classList.remove(this.class);
    }
    
    }

}
