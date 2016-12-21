import {Injectable} from '@angular/core';
import {CryptoService} from "../crypto/crypto.service";
import {DownloadService} from "../download/download.service";
import {UserService} from "../user/user.service";
import {SafeCertificate} from "./certificates/SafeCertificate";
import {CryptoPairKey} from "../crypto/keys/CryptoPairKey";
import {User} from "../user/users/User";
import {CryptoPasswordEntityResult} from "../crypto/keys/CryptoPasswordEntityResult";

@Injectable()
export class CertificateService {
  constructor(private cryptoService:CryptoService,
              private downloadService:DownloadService,
              private userService:UserService) {
  }

  generate(name:string, password:string):Promise<SafeCertificate> {
    return Promise.resolve()
      .then(() => this.userService.getUser())
      .then((user:User) => this.cryptoService.generatePairKey(user.name, user.email))
      .then((key:CryptoPairKey) => {
        let certificate = new SafeCertificate();

        certificate.name = name;
        certificate.key = key;

        return Promise.resolve()
          .then(() => this.cryptoService.fingerPrint(certificate))
          .then((id:string) => certificate.id = id)
          .then(() => certificate)
          .then((certificate:SafeCertificate) => this.userService.addCertificate(certificate))
          .then(() => this.cryptoService.encryptByPassword(certificate, password))
          .then((result:CryptoPasswordEntityResult) => {
            return this.downloadService.safeDownload(certificate.name + '.certificate.safe', result.data);
          })
          .then(() => certificate)
      });
  }
}
