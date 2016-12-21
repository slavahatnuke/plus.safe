import {CryptoKey} from './CryptoKey';

export class CryptoPairKey extends CryptoKey {
  public public:string = '';
  public private:string = '';

  deserialize(data:any) {
    data = data as CryptoPairKey;
    
    return Promise.resolve()
      .then(() => {
        this.public = data.public;
        this.private = data.private;
      });
  }
}
