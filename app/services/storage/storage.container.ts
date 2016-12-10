import {Injectable} from '@angular/core';
import {LocalStorage} from "./local/local.storage";
import {IStorage} from "./storage.interface";
import {LocalFilesStorage} from "./localFiles/local-files.storage";

@Injectable()
export class StorageContainer {

  constructor(private localStorage:LocalStorage, private localFilesStorage:LocalFilesStorage) {
  }

  get(name:string):Promise<IStorage> {
    if (name === 'local') {
      return Promise.resolve(this.localStorage);
    } else if(name === 'files'){
      return Promise.resolve(this.localFilesStorage);
    } else {
      return Promise.reject(new Error('No storage'));
    }
  }

}
