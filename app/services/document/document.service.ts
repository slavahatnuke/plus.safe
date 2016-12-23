import {Injectable} from '@angular/core';
import {LocalStorage} from "../storage/local/local.storage";
import {UserService} from "../user/user.service";
import {StorageContainer} from "../storage/storage.container";
import {CryptoService} from "../crypto/crypto.service";
import {IStorage} from "../storage/storage.interface";
import {SafeDocument} from "./SafeDocument";

@Injectable()
export class DocumentService {

  private storage:IStorage;

  constructor(private localStorage:LocalStorage,
              private userService:UserService,
              private storageContainer:StorageContainer,
              private cryptoService:CryptoService) {

  }

  load():Promise<DocumentService> {
    return Promise.resolve()
      .then(() => {
        return this.storageContainer.get('drive')
          .then((storage:any) => storage.auth())
          .then((storage:IStorage) => this.storage = storage)
          .then(() => this);
      });
  }

  getDocuments():Promise<SafeDocument[]> {
    return Promise.resolve().then(() => []);
  }
}
