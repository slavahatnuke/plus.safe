import {Injectable} from '@angular/core';
import {LocalStorage} from "./local/local.storage";
import {IStorage} from "./storage.interface";
import {LocalFilesStorage} from "./localFiles/local-files.storage";
import {GoogleDriveStorage} from "./drive/google-drive.storage";

@Injectable()
export class StorageContainer {

  private googleDriveStorage:GoogleDriveStorage;

  constructor(private localStorage:LocalStorage, private localFilesStorage:LocalFilesStorage) {
  }

  get(name:string):Promise<IStorage> {
    if (name === 'local') {
      return Promise.resolve(this.localStorage);
    } else if(name === 'files'){
      return Promise.resolve(this.localFilesStorage);
    } else if(name === 'drive'){
      if(this.googleDriveStorage) {
        return Promise.resolve(this.googleDriveStorage);
      } else {
        var googleDriveStorage = new GoogleDriveStorage();
        return googleDriveStorage.auth().then(() => this.googleDriveStorage = googleDriveStorage);
      }
    } else {
      return Promise.reject(new Error('No storage'));
    }
  }

}
