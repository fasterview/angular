import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { AuthService } from './services/auth.service';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TeamComponent } from './components/team/team.component';
import { PolicyComponent } from './components/policy/policy.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    Error404Component,
    AboutComponent,
    ContactComponent,
    TeamComponent,
    PolicyComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    AuthService,
  ],
})
export class CoreModule { }
