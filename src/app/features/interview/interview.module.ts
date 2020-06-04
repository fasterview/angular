import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewRoutingModule } from './interview-routing.module';
import { ShowComponent } from './components/show/show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ShowComponent],
  imports: [
    SharedModule,
    InterviewRoutingModule,
    HttpClientModule,
  ]
})
export class InterviewModule { }
