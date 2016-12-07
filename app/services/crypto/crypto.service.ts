declare var openpgp:any;
declare var Hashes:any;

import {Injectable} from '@angular/core';
import {CryptoKey} from './keys/cryptoKey';
@Injectable()
export class CryptoService {
  private numBits:number = 2048;
  private saltIterations = 128;
  private SHA512:any;

  constructor() {
    openpgp.initWorker({path: 'node_modules/openpgp/dist/openpgp.worker.js'});
    this.SHA512 = new Hashes.SHA512;
  }

  generateRandoms():Promise<string> {
    //@@@ improve randoms
    return new Promise<string>((resolve) => {
      return resolve(Math.random().toString(35).slice(2));
    });
  }

  generateSalt() {
    let promises:Promise<string>[] = [];

    for (let i = 0; i < this.saltIterations; i++) {
      promises.push(this.generateRandoms());
    }

    return Promise.all(promises)
      .then((result:string[]) => {
        return this.SHA512.hex(result.join(''));
      });
  }

  generateKey(name:string, email:string, password:string) {
    let options = {
      userIds: [{name: name, email: email}],
      numBits: this.numBits,
      passphrase: password
    };

    return new Promise<CryptoKey>((resolve, reject) => {
      openpgp.generateKey(options)
        .then((key:any) => {
          resolve({
            'private': key.privateKeyArmored,
            'public': key.publicKeyArmored,
          } as CryptoKey);
        })
        .catch(reject);
    });
  }
}
