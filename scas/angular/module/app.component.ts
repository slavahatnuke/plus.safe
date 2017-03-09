import {Component} from '@angular/core';
// import { {{{name | Camel}}}Service } from "./{{{ name | kebab }}}.service";
// import { {{{name | Camel}}} } from "./{{{ name | kebab }}}";
// import {ActivatedRoute} from "@angular/router";

@Component({
  selector: '{{{name | kebab}}}',
  templateUrl: './{{{name | kebab}}}.component.html',
  styleUrls: ['./{{{name | kebab}}}.component.css']
})
export class {{{name | Camel}}}Component {
  title = '{{{name | Camel}}} works!';
  // constructor(private {{{ name | camel }}}Service: {{{ name | Camel }}}Service, private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.data
  //   .map((data: { {{{ name | camel }}}: {{{ name | Camel }}} }) => data.{{{ name | camel }}})
  //   .subscribe(({{{ name | camel }}}: {{{ name | Camel }}}) => console.log({{{ name | camel }}}));
  // }

}
