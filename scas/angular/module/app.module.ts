import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { {{{name | Camel }}}RoutingModule} from "./{{{name | kebab}}}.routing.module";
import {RouterModule} from "@angular/router";

import { {{{name | Camel}}}Component } from './{{{name | kebab}}}.component';
import { {{{name | Camel}}}Service } from './{{{name | kebab}}}.service';


@NgModule({
  declarations: [
    {{{name | Camel}}}Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    {{{name | Camel }}}RoutingModule
  ],
  providers: [{{{ name | Camel }}}Service],
  exports: [{{{name | Camel}}}Component]
})
export class {{{name | Camel}}}Module { }
