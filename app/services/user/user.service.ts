import {Injectable} from '@angular/core';

import {SignUpUser} from './users/SignUpUser';
import {SignInUser} from './users/SignInUser';
import {Identity} from './users/Identity';

import {CryptoService} from '../crypto/crypto.service';
import {LocalStorage} from '../storage/local/local.starage';
import {CryptoPasswordKey} from "../crypto/keys/CryptoPasswordKey";
import {User} from "./users/User";
import {CryptoPairKey} from "../crypto/keys/CryptoPairKey";
import {DownloadService} from "../download/download.service";

@Injectable()
export class UserService {
  user:User;

  constructor(private cryptoService:CryptoService,
              private localStorage:LocalStorage,
              private downloadService:DownloadService) {
  }

  hasUser() {
    return new Promise<boolean>((resolve) => {
      resolve(!!this.user)
    });
  }

  signUp(signUpUser:SignUpUser) {
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
      .then(() => this.localStorage.del('identity'))
      .then(() => {
        if (user.useIdentityFile) {
          return this.cryptoService.shortFingerPrint(identity)
            .then((id) => this.downloadService.download(id, identity));
        } else {
          return this.localStorage.set('identity', identity);
        }
      })
      .then(() => this.user = user)
      .then(() => identity);
  }

  signIn(user:SignInUser) {
    return user.getIdentity()
      .catch(() => {
        return this.localStorage.get('identity');
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
      .then(() => this.localStorage.del('identity'))
      .then(() => this.user = null);
  }

  hasIdentity():Promise<boolean> {
    return this.localStorage.get('identity').then((_identity) => !!_identity);
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
}
