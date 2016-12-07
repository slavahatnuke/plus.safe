import {CryptoPairKey} from "../../crypto/keys/CryptoPairKey";

export class User {
  public name:string;
  public email:string;
  public key:CryptoPairKey|null;
  public useIdentityFile:boolean = true;

  resetKey() {
    this.key = null;
  }
}
