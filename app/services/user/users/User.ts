import {CryptoPairKey} from "../../crypto/keys/CryptoPairKey";
import {SafeCertificate} from "../../certificate/certificates/SafeCertificate";

export class User {
  public name:string;
  public email:string;
  public key:CryptoPairKey|null;
  public certificates:SafeCertificate[] = [];

  deserialize(data:any) {
    data = data as User;

    return Promise.resolve().then(() => {
      this.name = data.name;
      this.email = data.email;

      this.key = new CryptoPairKey();

      return Promise.resolve()
        .then(() => this.key.deserialize(data.key))
        .then(() => {
          let promises:Promise<SafeCertificate>[];

          promises = (data.certificates || [])
            .map((data:any) => {
              let certificate = new SafeCertificate();
              certificate.id = data.id;
              certificate.name = data.name;
              certificate.key = new CryptoPairKey();

              return Promise.resolve()
                .then(() => certificate.key.deserialize(data.key))
                .then(() => certificate);
            });

          return Promise.all(promises).then((certificates:SafeCertificate[]) => this.certificates = certificates);
        });
    });
  }

  addCertificate(certificate:SafeCertificate) {
    return Promise.resolve()
      .then(() => {
        let found = this.certificates.find((aCertificate) => aCertificate.id == certificate.id);
        if(!found) {
          this.certificates.push(certificate);
        }
      });
  }
}
