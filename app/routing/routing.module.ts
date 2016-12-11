import {NgModule}      from '@angular/core';

import {RouterModule}   from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';

import {AppComponent}  from '../app/app.component';
import {SignUpComponent}  from '../signup/signup.component';
import {SignInComponent}  from '../signin/signin.component';
import {SafeComponent}  from '../safe/safe.component';
import {UploaderComponent}  from '../uploader/uploader.component';
import {SafeTestComponent} from "../safe-test/safe-test.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
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
        component: SafeComponent
      },
      {
        path: 'safe-test',
        component: SafeTestComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    SafeComponent,
    UploaderComponent,
    SafeTestComponent
  ]
})
export class RoutingModule {
}
