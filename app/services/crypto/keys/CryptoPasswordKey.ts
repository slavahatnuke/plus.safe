import {CryptoKey} from './CryptoKey';
declare var Hashes:any;

export class CryptoPasswordKey extends CryptoKey {
  public salt:string;
  public iterations:number = 8;

  private password:string;
  private SHA512:any;

  constructor() {
    super();
    this.SHA512 = new Hashes.SHA512;
  }

  defineIterationsByTime(timeInMs:number) {
    return new Promise((resolve, reject) => {
      if (!this.salt) {
        return reject(new Error('No salt'));
      }

      //  @@@ todo set this.iterations based on time in ms, to encrypt
      this.iterations = 24;
      resolve(this.iterations);
    });
  }

  definePassword(originPassword:string) {
    return new Promise((resolve, reject) => {
      if (!this.salt) {
        return reject(new Error('No salt'));
      }

      let password = this.SHA512.hex(originPassword + this.salt);
      let passwordHash = this.SHA512.hex(originPassword + password + this.salt);

      for (var i = 0; i < this.iterations; i++) {
        password = this.SHA512.hex(password + this.salt + i);
        passwordHash = this.SHA512.hex(password + passwordHash + this.salt + i);
      }

      this.password = password + passwordHash;
      resolve(this.password);
    });
  }

  getPassword() {
    return this.password;
  }
}
