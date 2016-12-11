import {CryptoKey} from './CryptoKey';
declare var Hashes:any;

export class CryptoPasswordKey extends CryptoKey {
  public salt:string;
  public iterations:number = 16;

  private passwordLength:number = 16;

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

      let startedAt = new Date().getTime();
      let saltedPassword = this.SHA512.hex('test' + this.salt);
      let passwords:string[] = [];

      let now:number = new Date().getTime();

      for (var estimatedIteration = 0; now - startedAt < timeInMs; estimatedIteration++) {
        for (var j = 0; j < this.passwordLength; j++) {
          passwords[j] = this.SHA512.hex(saltedPassword + this.salt);
          saltedPassword = passwords.join('');
        }

        if (estimatedIteration % 10) {
          now = new Date().getTime();
        }
      }

      this.iterations = Math.round(estimatedIteration * 1.5);
      resolve(this.iterations);
    });
  }

  definePassword(originPassword:string) {
    return new Promise((resolve, reject) => {
      if (!this.salt) {
        return reject(new Error('No salt'));
      }

      let passwords:string[] = [];

      let saltedPassword = this.SHA512.hex(originPassword + this.salt);
      for (var j = 0; j < this.passwordLength; j++) {
        passwords[j] = this.SHA512.hex(originPassword + saltedPassword + this.salt);
        saltedPassword = passwords.join('');
      }

      for (var i = 0; i < this.iterations; i++) {
        for (var j = 0; j < this.passwordLength; j++) {
          passwords[j] = this.SHA512.hex(saltedPassword + this.salt);
          saltedPassword = passwords.join('');
        }
      }

      this.password = passwords.join('');
      resolve(this.password);
    });
  }

  getPassword() {
    return this.password;
  }
}
