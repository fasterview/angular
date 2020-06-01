import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { OrgRoutingModule } from './org-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrgService } from './services/org.service';




@NgModule({
  declarations: [CreateComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OrgRoutingModule,
    HttpClientModule
  ],
  providers: [OrgService]
})
export class OrgModule { }
