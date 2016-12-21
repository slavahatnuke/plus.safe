import {CryptoPairKey} from "../../crypto/keys/CryptoPairKey";
import {SafeCertificate} from "../../certificate/certificates/SafeCertificate";

export class User {
  public name:string;
  public email:string;
  public key:CryptoPairKey|null;

  public certificates:SafeCertificate[] = [];

  deserialize(data:any) {
    return Promise.resolve().then(() => {
      this.name = data.name;
      this.email = data.email;

      this.key = new CryptoPairKey();
      this.key.deserialize(data.key);

      this.certificates = (data.certificates || [])
        .map((data:any) => {
          let certificate = new SafeCertificate();
          certificate.id = data.id;
          certificate.name = data.name;
          certificate.key = new CryptoPairKey();
          certificate.key.deserialize(data.key);
          return certificate;
        });
    });
  }

  addCertificate(certificate:SafeCertificate) {
    return new Promise((resolve, reject) => {
      this.certificates.push(certificate);
      resolve();
    });
  }
}
