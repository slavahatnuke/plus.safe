import {NgModule}      from '@angular/core';

import {RouterModule}   from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';

import {AppComponent}  from '../app/app.component';
import {SignUpComponent}  from '../signup/signup.component';
import {SignInComponent}  from '../signin/signin.component';
import {SafeComponent}  from '../safe/safe.component';
import {UploaderComponent}  from '../uploader/uploader.component';
import {SafeSimpleComponent} from "../safe/simple/safe-simple.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/signup',
        pathMatch: 'full'
      },
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'signin',
        component: SignInComponent
      },
      {
        path: 'safe',
        component: SafeComponent,
        children: [
          {
            path: 'simple',
            component: SafeSimpleComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    SafeComponent,
    UploaderComponent,
    SafeSimpleComponent
  ]
})
export class RoutingModule {
}
