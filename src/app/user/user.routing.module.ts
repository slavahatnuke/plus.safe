import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { UserComponent} from "./user.component";

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    data: { title: 'User' },
    children: [
      // {
      //   path: ':id',
      //   component: UserComponent
      // }
    ]
  },
  { path: '',
    redirectTo: 'user',
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
export class UserRoutingModule { }
