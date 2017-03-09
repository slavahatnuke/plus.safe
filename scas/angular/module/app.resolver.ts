import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, BehaviorSubject} from "rxjs";

import { {{{ name | Camel }}}Service } from './{{{ name | kebab }}}.service';
import { {{{ name | Camel }}} } from './{{{ name | kebab }}}';

@Injectable()
export class {{{ name | Camel }}}Resolver implements Resolve<{{{ name | Camel }}}> {

  // constructor(private {{{ name | camel }}}Service: {{{ name | Camel }}}Service) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{{{ name | Camel }}}>|Promise<{{{ name | Camel }}}>|{{{ name | Camel }}} {
    // return this.{{{ name | camel }}}Service.getById(route.params['{{{ name | camel }}}Id']);
    // return new BehaviorSubject<{{{ name | Camel }}}>(new {{{ name | Camel }}});
    return Promise.resolve(new {{{ name | Camel }}}());
  }
}
