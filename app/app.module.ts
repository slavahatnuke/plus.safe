import {NgModule}      from '@angular/core';

import {AppComponent}  from './app.component';
import {RoutingModule}   from './routing/routing.module';

import {CryptoService} from './services/crypto/crypto.service';
import {DownloadService} from './services/download/download.service';
import {UserService} from './services/user/user.service';
import {LocalStorage} from './services/storage/local/local.storage';
import {StorageContainer} from "./services/storage/storage.container";

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG} from 'angular-2-local-storage';
import {LocalFilesStorage} from "./services/storage/localFiles/local-files.storage";
import {CertificateService} from "./services/certificate/certificate.service";
import {DocumentService} from "./services/document/docuemtn.service";

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
    CryptoService,
    DownloadService,
    UserService,
    LocalStorage,
    StorageContainer,
    LocalFilesStorage,
    CertificateService,
    DocumentService
  ],
  declarations: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
