import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { AuthComponent} from "./components/auth.component";
import { AuthResolver} from "./auth.resolver";
import { AuthCanActivate} from "./auth.canActivate";
import {SignInComponent} from "./components/sign-in.component";
import {SignUpComponent} from "./components/sign-up.component";

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    data: { title: 'Auth' },
    canActivate: [AuthCanActivate],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  }
  // ,
  // { path: '',
  //   redirectTo: 'auth',
  //   pathMatch: 'full'
  // },
  // { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [AuthResolver, AuthCanActivate],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
