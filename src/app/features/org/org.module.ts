import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { OrgRoutingModule } from './org-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrgService } from './services/org.service';
import { ShowComponent } from './components/show/show.component';
import { HomeComponent } from './components/home/home.component';
import { ShowInterviewComponent } from './components/show-interview/show-interview.component';
import { InterviewsComponent } from './components/interviews/interviews.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { UserComponent } from './components/employees/user/user.component';




@NgModule({
  declarations: [CreateComponent, ShowComponent, HomeComponent, ShowInterviewComponent, InterviewsComponent, TableRowComponent, EmployeesComponent, UserComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OrgRoutingModule,
    HttpClientModule
  ],
  providers: [OrgService]
})
export class OrgModule { }
