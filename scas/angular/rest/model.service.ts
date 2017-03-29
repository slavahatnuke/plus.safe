import {Injectable} from '@angular/core';
import { {{{ name | Camel }}}Resource } from "./{{{ name | kebab }}}.resource";
import { {{{ name | Camel }}} } from "./{{{ name | Camel }}}";
import 'rxjs/operator/toPromise'

@Injectable()
export class {{{ name | Camel }}}Service {

  constructor(private {{{ name | camel }}}Resource: {{{ name | Camel }}}Resource) {
  }

  create({{{ name | camel }}}: {{{ name | Camel }}}): Promise<{{{ name | Camel }}}> {
    return this.{{{ name | camel }}}Resource.create({{{ name | camel }}})
      .$observable
      .toPromise()
  }

  save({{{ name | camel }}}: {{{ name | Camel }}}): Promise<{{{ name | Camel }}}> {
    return {{{ name | camel }}}.id ? this.update({{{ name | camel }}}) : this.create({{{ name | camel }}});
  }

  getList(): Promise<{{{ name | Camel }}}[]> {
    return this.{{{ name | camel }}}Resource.getList()
      .$observable
      .toPromise()
  }

  get(id: string): Promise<{{{ name | Camel }}}> {
    return this.{{{ name | camel }}}Resource.get({id: id})
      .$observable
      .toPromise()
  }

  update({{{ name | camel }}}: {{{ name | Camel }}}): Promise<{{{ name | Camel }}}> {
    return this.{{{ name | camel }}}Resource.update({{{ name | camel }}})
      .$observable
      .toPromise()
  }

  remove({{{ name | camel }}}: {{{ name | Camel }}}): Promise<any> {
    return this.{{{ name | camel }}}Resource.remove({{{ name | camel }}})
      .$observable
      .toPromise()
  }
}
