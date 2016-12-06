import {NgModule}      from '@angular/core';

import {AppComponent}  from './app/app.component';
import {RoutingModule}   from './routing/routing.module';

import {CryptoService} from './services/crypto/crypto.service';
import {DownloadService} from './services/download/download.service';
import {UserService} from './services/user/user.service';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  imports: [
    RoutingModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: CryptoService, useClass: CryptoService},
    {provide: DownloadService, useClass: DownloadService},
    {provide: UserService, useClass: UserService}
  ],
  declarations: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
