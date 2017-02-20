import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { {{{name | Camel}}}Component } from './{{{name | kebab}}}.component';

@NgModule({
  declarations: [
    {{{name | Camel}}}Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [{{{name | Camel}}}Component]
})
export class {{{name | Camel}}}Module { }
