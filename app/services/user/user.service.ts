import {Injectable} from '@angular/core';
import {SignUpUser} from './SignUpUser';
import {CryptoService} from '../crypto/crypto.service';

import {SignUpUser} from './SignUpUser';

@Injectable()
export class UserService {
  constructor(private cryptoService:CryptoService) {

  }

  signUp(user:SignUpUser) {
    return new Promise((resolve, reject) => {
      console.log(user);
      resolve();
    });
  }
}
