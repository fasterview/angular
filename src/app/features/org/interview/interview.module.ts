import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewRoutingModule } from './interview-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    InterviewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class InterviewModule { }
