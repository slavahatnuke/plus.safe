import {Injectable} from '@angular/core';

import {SignUpUser} from './users/SignUpUser';
import {SignInUser} from './users/SignInUser';
import {Identity} from './users/Identity';

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
        let identity = new Identity();

        user.name = signUpUser.name;
        user.email = signUpUser.email;
        user.useIdentityFile = signUpUser.useIdentityFile;

        return this.cryptoService.generatePairKey(user.name, user.email)
          .then((key:CryptoPairKey) => {
            user.key = key;
          })
          .then(() => this.cryptoService.generatePasswordKey(signUpUser.password))
          .then((passwordKey:CryptoPasswordKey) => {
            identity.salt = passwordKey.salt;
            identity.iterations = passwordKey.iterations;

            return this.cryptoService.encrypt(user, passwordKey)
              .then((data) => {
                identity.data = data;
              });
          })
          .then(() => {
            if (user.useIdentityFile) {
              return this.storageContainer.get('files');
            } else {
              return this.getLocalStorage();
            }
          })
          .then((storage) => storage.create('identity', identity))
          .then(() => this.user = user)
          .then(() => identity);
      });
  }

  signIn(user:SignInUser) {
    return user.getIdentity()
      .catch(() => {
        return this.getLocalStorage()
          .then((localStorage) => localStorage.get('identity'));
      })
      .then((_identity) => {
        if (!_identity) {
          return Promise.reject(new Error('No identity'));
        }

        let identity = _identity as Identity;
        let key = new CryptoPasswordKey();

        key.salt = identity.salt;
        key.iterations = identity.iterations;

        return key.definePassword(user.password)
          .then(() => this.cryptoService.decrypt(identity.data, key))
          .then((data) => {
            this.user = new User();

            this.user.name = data.name;
            this.user.email = data.email;
            this.user.useIdentityFile = data.useIdentityFile;

            this.user.key = new CryptoPairKey();
            this.user.key.public = data.key.public;
            this.user.key.private = data.key.private;
          })
      });
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
      .then((_identity) => !!_identity);
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
