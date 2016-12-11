import {Injectable} from '@angular/core';

import {SignUpUser} from './users/SignUpUser';
import {SignInUser} from './users/SignInUser';

import {CryptoService} from '../crypto/crypto.service';
import {LocalStorage} from '../storage/local/local.storage';
import {CryptoPasswordKey} from "../crypto/keys/CryptoPasswordKey";
import {User} from "./users/User";
import {CryptoPairKey} from "../crypto/keys/CryptoPairKey";
import {DownloadService} from "../download/download.service";
import {StorageContainer} from "../storage/storage.container";

@Injectable()
export class UserService {
  user:User;

  constructor(private cryptoService:CryptoService,
              private storageContainer:StorageContainer,
              private downloadService:DownloadService) {
  }

  hasUser() {
    return new Promise<boolean>((resolve) => {
      resolve(!!this.user)
    });
  }

  signUp(signUpUser:SignUpUser) {
    return this.signOut()
      .then(() => {
        let user = new User();

        user.name = signUpUser.name;
        user.email = signUpUser.email;
        user.useIdentityFile = signUpUser.useIdentityFile;

        return this.cryptoService.generatePairKey(user.name, user.email)
          .then((key:CryptoPairKey) => user.key = key)
          .then(() => this.cryptoService.encryptByPassword(user, signUpUser.password))
          .then((identity) => {
            return Promise.resolve()
              .then(() => {
                if (user.useIdentityFile) {
                  return this.storageContainer.get('files');
                } else {
                  return this.getLocalStorage();
                }
              })
              .then((storage) => storage.create('identity', identity));
          })
          .then(() => this.user = user);
      });
  }

  signIn(user:SignInUser) {
    return user.getIdentity()
      .catch(() => {
        return this.getLocalStorage()
          .then((localStorage) => localStorage.get('identity'));
      })
      .then((identity) => identity || Promise.reject(new Error('No identity')))
      .then((identity) => this.cryptoService.decryptByPassword(identity, user.password) as User)
      .then((data) => {
        this.user = new User();
        this.user.deserialize(data);
      })
  }

  signOut() {
    return Promise.resolve()
      .then(() => this.getLocalStorage())
      .then((localStorage) => localStorage.del('identity'))
      .then(() => this.user = null);
  }

  hasIdentity():Promise<boolean> {
    return this.getLocalStorage()
      .then((localStorage) => localStorage.get('identity'))
      .then((identity) => !!identity);
  }

  download(name:string, data:any) {
    return this.encrypt(data).then((result) => this.downloadService.download(name, result));
  }

  encrypt(data:any):Promise<string> {
    return this.cryptoService.encrypt(data, this.user.key);
  }

  decrypt(data:string):Promise<any> {
    return this.cryptoService.decrypt(data, this.user.key);
  }

  private getLocalStorage():Promise<LocalStorage> {
    return this.storageContainer.get('local');
  }

}
