import {CryptoPairKey} from "../../crypto/keys/CryptoPairKey";

export class User {
  public name:string;
  public email:string;
  public key:CryptoPairKey|null;

  deserialize(data:any) {
    return Promise.resolve().then(() => {
      this.name = data.name;
      this.email = data.email;

      this.key = new CryptoPairKey();
      this.key.public = data.key.public;
      this.key.private = data.key.private;
    });
  }
}
