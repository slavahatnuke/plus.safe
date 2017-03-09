
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    data: { title: 'App' },
    children: [
      // {
      //   path: ':id',
      //   component: ChildComponent
      // }
    ]
  },
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full'},
  { path: '**', redirectTo: 'signin'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
