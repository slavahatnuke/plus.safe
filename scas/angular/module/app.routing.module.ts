import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { {{{ name | Camel }}}Component} from "./{{{ name | kebab }}}.component";
import { {{{ name | Camel}}}Resolver} from "./{{{ name | kebab }}}.resolver";
import { {{{ name | Camel}}}CanActivate} from "./{{{ name | kebab }}}.canActivate";

const routes: Routes = [
  {
    path: '{{{ name | kebab }}}',
    component: {{{ name | Camel }}}Component,
    data: { title: '{{{ name | Camel }}}' },
    canActivate: [{{{ name | Camel}}}CanActivate],
    children: [
      // {
      //   path: ':{{{ name | camel }}}Id',
      //   component: {{{ name | Camel }}}Component,
      //   resolve: {
      //     {{{ name | camel}}}: {{{ name | Camel}}}Resolver
      //   }
      // }
    ]
  }
  // ,
  // { path: '',
  //   redirectTo: '{{{ name | kebab }}}',
  //   pathMatch: 'full'
  // },
  // { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [{{{ name | Camel}}}Resolver, {{{ name | Camel}}}CanActivate],
  exports: [RouterModule]
})
export class {{{ name | Camel }}}RoutingModule { }
