import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { {{{name | Camel}}}Component } from './{{{name | kebab}}}.component';
import { {{{name | Camel}}}Service } from './{{{name | kebab}}}.service';


@NgModule({
  declarations: [
    {{{name | Camel}}}Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [{{{ name | Camel }}}Service],
  exports: [{{{name | Camel}}}Component]
})
export class {{{name | Camel}}}Module { }
