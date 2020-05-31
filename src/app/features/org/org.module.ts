import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { OrgRoutingModule } from './org-routing.module';




@NgModule({
  declarations: [CreateComponent],
  imports: [
    SharedModule,
    OrgRoutingModule
  ]
})
export class OrgModule { }
