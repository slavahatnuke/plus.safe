import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, BehaviorSubject} from "rxjs";

// import { {{{ name | Camel }}}Service } from './{{{ name | kebab }}}.service';

@Injectable()
export class {{{ name | Camel }}}CanActivate implements CanActivate, CanActivateChild {
  // constructor(private {{{ name | camel }}}Service:{{{ name | Camel }}}Service) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return new BehaviorSubject<boolean>(true);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }
}
