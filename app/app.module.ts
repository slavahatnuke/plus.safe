import {NgModule}      from '@angular/core';

import {AppComponent}  from './app/app.component';
import {RoutingModule}   from './routing/routing.module';

import {CryptoService} from './services/crypto/crypto.service';
import {DownloadService} from './services/download/download.service';
import {UserService} from './services/user/user.service';
import {LocalStorage} from './services/storage/local/local.starage';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG} from 'angular-2-local-storage';

let localStorageServiceConfig = {
  prefix: 'plus-safe',
  storageType: 'localStorage'
};

@NgModule({
  imports: [
    RoutingModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    LocalStorageService,
    {
      provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
    },
    {provide: CryptoService, useClass: CryptoService},
    {provide: DownloadService, useClass: DownloadService},
    {provide: UserService, useClass: UserService},
    {provide: LocalStorage, useClass: LocalStorage}
  ],
  declarations: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
