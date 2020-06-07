import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewRoutingModule } from './interview-routing.module';
import { ShowComponent } from './components/show/show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SubmitComponent } from './components/submit/submit.component';


@NgModule({
  declarations: [ShowComponent, HomeComponent, SubmitComponent],
  imports: [
    SharedModule,
    InterviewRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class InterviewModule { }
