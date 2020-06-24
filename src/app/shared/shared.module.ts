import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassOnClickDirective } from './directives/class-on-click.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { PreviewInterviewComponent } from './components/preview-interview/preview-interview.component';
import { CopyComponent } from './components/copy/copy.component';



@NgModule({
  declarations: [ClassOnClickDirective, PreviewInterviewComponent, CopyComponent],
  imports:[
    CommonModule
  ],
  exports: [
    CommonModule,
    ClassOnClickDirective,
    PreviewInterviewComponent,
    CopyComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ]
})
export class SharedModule { }
