declare var openpgp:any;
import {Injectable} from '@angular/core';
import {CryptoKey} from './cryptoKey';

@Injectable()
export class CryptoService {
  private numBits:number = 2048;

  constructor() {
    openpgp.initWorker({path: 'node_modules/openpgp/dist/openpgp.worker.js'});
  }

  generateKey(name:string, email:string, password:string) {
    let options = {
      userIds: [{name: name, email: email}],
      numBits: this.numBits,
      passphrase: password
    };

    return new Promise<CryptoKey>((resolve, reject) => {
      try {
        openpgp.generateKey(options)
          .then((key:any) => {
            resolve({
              'private': key.privateKeyArmored,
              'public': key.publicKeyArmored,
            } as CryptoKey);
          })
          .catch(reject);
      } catch (err) {
        reject(err);
      }
    });
  }
}
