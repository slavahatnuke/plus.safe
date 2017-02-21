import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app.routing.module";
import {RouterModule} from "@angular/router";
import {UserModule} from "./user/user.module";
import {OpenPgpModule} from "./open-pgp/open-pgp.module";
import {Crypt} from "./crypt/crypt";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    UserModule,
    Crypt
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
