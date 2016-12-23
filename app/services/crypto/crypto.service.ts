import {CryptoKey} from "./keys/CryptoKey";

declare var openpgp:any;
declare var Hashes:any;

import {Injectable} from '@angular/core';
import {CryptoPairKey} from './keys/CryptoPairKey';
import {CryptoPasswordKey} from './keys/CryptoPasswordKey';
import {CryptoPasswordEntity} from "./keys/CryptoPasswordEntity";
import {CryptoPasswordEntityResult} from "./keys/CryptoPasswordEntityResult";

@Injectable()
export class CryptoService {
  private bitLength:number = 2048;

  private saltLength:number = 2048 / 512;
  private saltIterations:number = 2048 / 32;

  private estimatedEncryptionTimeInMs = 2048 / 2;
  private SHA512:any;

  constructor() {
    openpgp.initWorker({path: 'node_modules/openpgp/dist/openpgp.worker.js'});
    this.SHA512 = new Hashes.SHA512;
    /// @@@ make it 4k or 8k = 4096 or 8192
    this.setBitLength(512);
  }

  generateRandoms():Promise<string> {
    //@@@ improve randoms
    return new Promise<string>((resolve) => {
      return resolve(Math.random().toString(35).slice(2) + this.SHA512.hex('' + new Date().getTime()));
    });
  }

  generateSalt() {
    let promises:Promise<string>[] = [];

    for (let i = 0; i < this.saltLength; i++) {
      promises.push(this.getHashSalt());
    }

    return Promise.all(promises)
      .then((salts:string[]) => salts.join(''));
  }

  generateId() {
    return this.generateSalt().then((salt) => this.fingerPrint(salt));
  }
  
  generatePairKey(name:string, email:string):Promise<CryptoPairKey> {
    let options = {
      userIds: [{name: name, email: email}],
      numBits: this.bitLength
    };

    return new Promise<CryptoPairKey>((resolve, reject) => {
      openpgp.generateKey(options)
        .then((key:any) => {
          let pairKey = new CryptoPairKey();
          pairKey.public = key.publicKeyArmored;
          pairKey.private = key.privateKeyArmored;

          resolve(pairKey);
        })
        .catch(reject);
    });
  }


  generatePasswordKey(password:string, estimatedEncryptionTimeInMs:number = 0):Promise<CryptoPasswordKey> {
    let key = new CryptoPasswordKey();

    estimatedEncryptionTimeInMs = estimatedEncryptionTimeInMs || this.estimatedEncryptionTimeInMs;
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

  decryptByPassword(stringEntity:string, password:string):Promise<CryptoPasswordEntityResult> {
    return Promise.resolve()
      .then(() => JSON.parse(stringEntity) as CryptoPasswordEntity)
      .then((entity:CryptoPasswordEntity) => {
        return Promise.resolve()
          .then(() => {
            let key = new CryptoPasswordKey();
            key.salt = entity.salt;
            key.iterations = entity.iterations;
            return key.definePassword(password)
              .then(() => key);
          })
          .then((key) => {
            return Promise.resolve()
              .then(() => this.decrypt(entity.data, key))
              .then((data:any) => new CryptoPasswordEntityResult(data, key));
          });
      });
  }

  encryptByPassword(data:any, password:string, estimatedEncryptionTimeInMs:number = 0):Promise<CryptoPasswordEntityResult> {
    return this.generatePasswordKey(password, estimatedEncryptionTimeInMs)
      .then((key:CryptoPasswordKey) => {
        return Promise.resolve()
          .then(() => this.encrypt(data, key))
          .then((data:string) => new CryptoPasswordEntityResult(data, key));
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

  shortFingerPrint(data:any):Promise<string> {
    return this.fingerPrint(data).then((print) => print.slice(-16));
  }

  fingerPrint(data:any):Promise<string> {
    return Promise.resolve().then(() => this.SHA512.hex(JSON.stringify(data)) as string);
  }

  private encryptByPasswordKey(data:any, key:CryptoPasswordKey):Promise<string> {
    let entity = new CryptoPasswordEntity();
    entity.salt = key.salt;
    entity.iterations = key.iterations;

    return new Promise<string>((resolve, reject) => {
      openpgp.encrypt({
        data: JSON.stringify(data),
        passwords: [key.getPassword()]
      })
        .then((ciphertext:any) => {
          entity.data = ciphertext.data;
          resolve(JSON.stringify(entity));
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
        privateKey: openpgp.key.readArmored(key.private).keys[0]
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

  private setBitLength(bitLength:number) {
    this.bitLength = bitLength;

    this.saltLength = Math.round(bitLength / 512);
    this.saltIterations = Math.round(bitLength / 32);
    this.estimatedEncryptionTimeInMs = Math.round(bitLength / 2);
  }

}
