import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, BehaviorSubject} from "rxjs";

import { AuthService } from './auth.service';
import { Auth } from './auth';

@Injectable()
export class AuthResolver implements Resolve<Auth> {

  // constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Auth>|Promise<Auth>|Auth {
    // return this.authService.getById(route.params['authId']);
    // return new BehaviorSubject<Auth>(new Auth);
    return Promise.resolve(new Auth());
  }
}
