import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';

import { LoginComponent } from './core/components/auth/login/login.component';
import { RegisterComponent } from './core/components/auth/register/register.component';

import { NotAuthGuard } from './core/guards/not-auth.guard';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { Error404Component } from './core/components/errors/error404/error404.component';



const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [NotAuthGuard]},
  {
    path: "profile",
    canActivate: [AuthGuard],
    loadChildren: () => import("./features/user/user.module").then(m => m.UserModule)
  },
  {path: "login", component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: "register", component: RegisterComponent, canActivate: [NotAuthGuard]},
  {path: "not-found", component: Error404Component},
  {path: "**", redirectTo: "not-found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
