import {NgModule}      from '@angular/core';
import {RouterModule}   from '@angular/router';

import {AppComponent}  from '../app/app.component';
import {SignUpComponent}  from '../signup/signup.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/safe',
        pathMatch: 'full'
      },
      {
        path: 'safe',
        component: SignUpComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    SignUpComponent
  ]
})
export class RoutingModule {
}
