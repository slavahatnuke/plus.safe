import {Component} from '@angular/core';

@Component({
  selector: '{{{name | kebab}}}',
  templateUrl: './{{{name | kebab}}}.component.html',
  styleUrls: ['./{{{name | kebab}}}.component.css']
})
export class {{{name | Camel}}}Component {
  title = 'works!';
}
