import {CryptoKey} from './CryptoKey';

export class CryptoPairKey extends CryptoKey {
  public public:string = '';
  public private:string = '';

  deserialize(data:any) {
    this.public = data.public;
    this.private = data.private;
  }
}
