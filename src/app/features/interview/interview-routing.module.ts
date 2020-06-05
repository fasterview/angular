import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowComponent } from './components/show/show.component';


const routes: Routes = [
  {path: ":id", component: HomeComponent, children: [
    {path: "", component: ShowComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewRoutingModule { }
