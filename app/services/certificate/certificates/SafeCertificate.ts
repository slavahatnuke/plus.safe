import {CryptoPairKey} from "../../crypto/keys/CryptoPairKey";

export class SafeCertificate {
  public id:string;
  public name:string;
  public key:CryptoPairKey;


  deserialize(data:any) {
    data = data as SafeCertificate;

    return Promise.resolve().then(() => {
      this.id = data.id;
      this.name = data.name;
      this.key = new CryptoPairKey;
      return this.key.deserialize(data.key);
    });
  }

}
