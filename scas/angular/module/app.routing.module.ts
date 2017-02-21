import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { {{{ name | Camel }}}Component} from "./{{{ name | kebab }}}.component";

const routes: Routes = [
  {
    path: '{{{ name | kebab }}}',
    component: {{{ name | Camel }}}Component,
    data: { title: '{{{ name | Camel }}}' },
    children: [
      // {
      //   path: ':id',
      //   component: {{{ name | Camel }}}Component
      // }
    ]
  },
  { path: '',
    redirectTo: '{{{ name | kebab }}}',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class {{{ name | Camel }}}RoutingModule { }
