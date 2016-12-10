import {IStorage} from '../storage.interface';
import {Injectable} from '@angular/core';

import {DownloadService} from "../../download/download.service";
import {CryptoService} from "../../crypto/crypto.service";

@Injectable()
export class LocalFilesStorage implements IStorage {

  constructor(private downloadService:DownloadService, private cryptoService:CryptoService) {
  }

  create(name:string, value:any):Promise<string> {
    return this.cryptoService.shortFingerPrint(value)
      .then((hash) => {
        var id = `${name}.${hash}`;
        this.downloadService.download(id, value)
          .then(() => id)
      });
  }

  set(name:string, value:any):Promise<boolean> {
    return Promise.resolve().then(() => true)
  }

  get(name:string):Promise<any> {
    /// @@@ todo asking for file
    return Promise.resolve().then(() => '')
  }

  del(name:string):Promise<boolean> {
    return Promise.resolve().then(() => true)
  }
}
