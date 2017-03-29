import {Injectable, Injector} from '@angular/core';
import {RequestMethod, Http} from '@angular/http';

import {Resource, ResourceAction, ResourceMethod, ResourceResult, ResourceParams} from 'ng2-resource-rest';
import { {{{ name | Camel }}} } from "./{{{ name | Camel }}}";

@Injectable()
@ResourceParams({
  url: '/api/{{{ name | plural | kebab }}}'
})
export class {{{ name | Camel }}}Resource extends Resource {
  constructor(http: Http, injector: Injector) {
    super(http, injector);
  }

  @ResourceAction({
    method: RequestMethod.Post,
  })
  create: ResourceMethod<{{{ name | Camel }}}, {{{ name | Camel }}}>;

  @ResourceAction({
    isArray: true,
  })
  getList: ResourceMethod<any, {{{ name | Camel }}}[]>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/{!id}'
  })
  get: ResourceMethod<{id: any}, {{{ name | Camel }}}>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update: ResourceMethod<{{{ name | Camel }}}, {{{ name | Camel }}}>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{{{ name | Camel }}}, any>;

}
