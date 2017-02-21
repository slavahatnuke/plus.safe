import { NgModule } from '@angular/core';
import { {{{ name | Camel }}}Service } from './{{{ name | kebab }}}.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [{{{ name | Camel }}}Service],
  exports: []
})
export class {{{ name | Camel }}}Module { }
