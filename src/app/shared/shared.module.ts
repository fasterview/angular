import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassOnClickDirective } from './directives/class-on-click.directive';



@NgModule({
  declarations: [ClassOnClickDirective],
  exports: [
    CommonModule,
    ClassOnClickDirective,
  ]
})
export class SharedModule { }
