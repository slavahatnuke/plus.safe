import {CryptoPairKey} from "../../crypto/keys/CryptoPairKey";

export class User {
  public name:string;
  public email:string;
  public key:CryptoPairKey|null;
  public useIdentityFile:boolean = true;

  deserialize(data:any) {
    return Promise.resolve().then(() => {
      this.name = data.name;
      this.email = data.email;
      this.useIdentityFile = data.useIdentityFile;

      this.key = new CryptoPairKey();
      this.key.public = data.key.public;
      this.key.private = data.key.private;
    });
  }
}
