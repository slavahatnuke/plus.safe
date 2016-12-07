import {Injectable} from '@angular/core';

import {SignUpUser} from './SignUpUser';
import {SignInUser} from './SignInUser';
import {User} from './User';

import {CryptoService} from '../crypto/crypto.service';
import {LocalStorage} from '../storage/local/local.starage';

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

    return this.cryptoService.generateSalt()
      .then((salt) => {
        user.name = signUpUser.name;
        user.salt = salt;
      })
      .then(() => {
        return this.localStorage.set('user', user.serialize());
      })
      .then(() => {
        // this.user = user;
      })
      .then(() => {
        return user;
      });
  }

  signIn(user:SignInUser) {
    return new Promise((resolve, reject) => {
      console.log('sign in', user);
      resolve();
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
