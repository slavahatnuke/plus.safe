import {NgModule}      from '@angular/core';

import {AppComponent}  from './app/app.component';
import {RoutingModule}   from './routing/routing.module';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  imports: [
    RoutingModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  declarations: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
