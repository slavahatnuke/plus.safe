import {CryptoKey} from "./keys/CryptoKey";
declare var openpgp:any;
declare var Hashes:any;

import {Injectable} from '@angular/core';
import {CryptoPairKey} from './keys/CryptoPairKey';
import {CryptoPasswordKey} from './keys/CryptoPasswordKey';

@Injectable()
export class CryptoService {
  private bitLength:number = 2048;

  private saltLength:number = 2048 / 512;
  private saltIterations:number = 2048 / 32;

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

    for (let i = 0; i < this.saltLength; i++) {
      promises.push(this.getHashSalt());
    }

    return Promise.all(promises)
      .then((salts:string[]) => {
        return salts.join('');
      });
  }

  generatePairKey(name:string, email:string):Promise<CryptoPairKey> {
    let options = {
      userIds: [{name: name, email: email}],
      numBits: this.bitLength
    };

    return new Promise<CryptoPairKey>((resolve, reject) => {
      openpgp.generateKey(options)
        .then((key:any) => {
          resolve({
            'private': key.privateKeyArmored,
            'public': key.publicKeyArmored,
          } as CryptoPairKey);
        })
        .catch(reject);
    });
  }


  generatePasswordKey(password:string, estimatedEncryptionTimeInMs:number = 1000):Promise<CryptoPasswordKey> {
    let key = new CryptoPasswordKey();

    return this.generateSalt()
      .then((salt) => {
        key.salt = salt;
        return key.defineIterationsByTime(estimatedEncryptionTimeInMs);
      })
      .then(() => key.definePassword(password))
      .then(() => key);
  }

  encrypt(data:any, key:CryptoKey):Promise<string> {
    return Promise.resolve().then(() => {
      if (key instanceof CryptoPasswordKey) {
        return this.encryptByPasswordKey(data, key);
      } else if (key instanceof CryptoPairKey) {
        return this.encryptByPairKey(data, key);
      } else {
        return Promise.reject(new Error('Unsupported key'));
      }
    });
  }

  decrypt(data:string, key:CryptoKey):Promise<any> {
    return Promise.resolve().then(() => {
      if (key instanceof CryptoPasswordKey) {
        return this.decryptByPasswordKey(data, key);
      } else if (key instanceof CryptoPairKey) {
        return this.decryptByPairKey(data, key);
      } else {
        return Promise.reject(new Error('Unsupported key'));
      }
    });
  }

  private encryptByPasswordKey(data:any, key:CryptoPasswordKey):Promise<string> {
    return new Promise<string>((resolve, reject) => {
      openpgp.encrypt({
        data: JSON.stringify(data),
        passwords: [key.getPassword()]
      })
        .then((ciphertext:any) => {
          resolve(ciphertext.data);
        })
        .catch(reject);
    });
  }

  private encryptByPairKey(data:any, key:CryptoPairKey):Promise<string> {
    return new Promise<string>((resolve, reject) => {
      openpgp.encrypt({
        data: JSON.stringify(data),
        publicKeys: openpgp.key.readArmored(key.public).keys,
        privateKeys: openpgp.key.readArmored(key.private).keys
      })
        .then((ciphertext:any) => {
          resolve(ciphertext.data);
        })
        .catch(reject);
    });
  }

  private decryptByPasswordKey(data:string, key:CryptoPasswordKey):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      openpgp.decrypt({
        message: openpgp.message.readArmored(data),
        password: key.getPassword()
      })
        .then((plaintext:any) => {
          resolve(JSON.parse(plaintext.data));
        })
        .catch(reject);
    });
  }

  private decryptByPairKey(data:string, key:CryptoPairKey):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      openpgp.decrypt({
        message: openpgp.message.readArmored(data),
        publicKeys: openpgp.key.readArmored(key.public).keys,
        privateKeys: openpgp.key.readArmored(key.private).keys
      })
        .then((result:any) => {
          resolve(JSON.parse(result.data));
        })
        .catch(reject);
    });
  }

  private getHashSalt() {
    let promises:Promise<string>[] = [];

    for (let i = 0; i < this.saltIterations; i++) {
      promises.push(this.generateRandoms());
    }

    return Promise.all(promises)
      .then((randoms:string[]) => {
        return this.SHA512.hex(randoms.join(''));
      });
  }

}
