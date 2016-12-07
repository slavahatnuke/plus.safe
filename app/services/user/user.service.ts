import {Injectable} from '@angular/core';

import {SignUpUser} from './users/SignUpUser';
import {SignInUser} from './users/SignInUser';
import {Identity} from './users/Identity';

import {CryptoService} from '../crypto/crypto.service';
import {LocalStorage} from '../storage/local/local.starage';
import {CryptoPasswordKey} from "../crypto/keys/CryptoPasswordKey";
import {User} from "./users/User";
import {CryptoPairKey} from "../crypto/keys/CryptoPairKey";

@Injectable()
export class UserService {
  user:User;

  constructor(private cryptoService:CryptoService,
              private localStorage:LocalStorage) {
  }

  isSignedUp() {
    return new Promise<boolean>((resolve) => {
      resolve(!!this.user)
    });
  }

  isSignedIn() {
    return new Promise<boolean>((resolve) => {
      resolve(!!this.user)
    });
  }

  signUp(signUpUser:SignUpUser) {
    let user = new User();
    let identity = new Identity();

    user.name = signUpUser.name;
    user.email = signUpUser.email;

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
      .then(() => this.localStorage.set('identity', identity))
      .then(() => this.user = user)
      .then(() => identity);
  }

  signIn(user:SignInUser) {
    return this.localStorage.get('identity').then((_identity) => {
      if (!_identity) {
        return Promise.reject(new Error('No identity'));
      }

      let identity = _identity as Identity;
      let key = new CryptoPasswordKey();

      key.salt = identity.salt;
      key.iterations = identity.iterations;

      return key.definePassword(user.password)
        .then(() => this.cryptoService.decrypt(identity.data, key))
        .then((data) => this.user = data as User)
        .then(() => {
          console.log(this.user);
        })
        .then(() => this.user)
        .catch((err) => {
          console.log(err, err.stack);
          return Promise.reject(err);
        });
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      console.log('sign out', this.user);
      this.user = null;
      resolve();
    });
  }
}
