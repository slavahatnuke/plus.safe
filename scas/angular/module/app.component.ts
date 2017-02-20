import {Component} from '@angular/core';
import { {{{name | Camel}}}Service } from "./{{{ name | kebab }}}.service";

@Component({
  selector: '{{{name | kebab}}}',
  templateUrl: './{{{name | kebab}}}.component.html',
  styleUrls: ['./{{{name | kebab}}}.component.css']
})
export class {{{name | Camel}}}Component {
  title = 'works!';
  constructor(private {{{ name | camel }}}Service: {{{ name | Camel }}}Service) {}
}
