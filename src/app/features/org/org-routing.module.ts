import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ShowComponent } from './components/show/show.component';
import { HomeComponent } from './components/home/home.component';




const routes: Routes = [
  {path: "", component: HomeComponent, children: [
    {path: "", component: ShowComponent},
    {path: "interview", loadChildren: () => import("./interview/interview.module").then( m => m.InterviewModule )},
  ]},
  {path: "create-org", component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule { }
