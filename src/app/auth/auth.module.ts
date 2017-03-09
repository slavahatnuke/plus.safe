import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthRoutingModule} from "./auth.routing.module";
import {RouterModule} from "@angular/router";

import { AuthComponent } from './components/auth.component';
import { AuthService } from './auth.service';
import {SignInComponent} from "./components/sign-in.component";
import {SignUpComponent} from "./components/sign-up.component";


@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AuthRoutingModule
  ],
  providers: [AuthService],
  exports: [AuthComponent]
})
export class AuthModule { }
