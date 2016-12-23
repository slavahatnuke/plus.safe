import {Injectable} from '@angular/core';
import {LocalStorage} from "../storage/local/local.storage";
import {UserService} from "../user/user.service";
import {StorageContainer} from "../storage/storage.container";
import {CryptoService} from "../crypto/crypto.service";
import {IStorage} from "../storage/storage.interface";
import {SafeDocument} from "./SafeDocument";
import {CertificateService} from "../certificate/certificate.service";
import {SafeCertificate} from "../certificate/certificates/SafeCertificate";

@Injectable()
export class DocumentService {

  private storage:IStorage;

  constructor(private localStorage:LocalStorage,
              private userService:UserService,
              private storageContainer:StorageContainer,
              private cryptoService:CryptoService,
              private certificateService:CertificateService) {

  }

  load():Promise<DocumentService> {
    return Promise.resolve()
      .then(() => {
        return this.storageContainer.get('drive')
          .then((storage:any) => storage.auth())
          .then((storage:IStorage) => this.storage = storage)
          .then(() => this);
      });
  }

  getDocuments():Promise<SafeDocument[]> {
    return Promise.resolve().then(() => []);
  }

  save(document:SafeDocument) {
    return this.certificateService.getCertificateById(document.keyId)
      .then((certificate:SafeCertificate) => {
        return Promise.resolve()
          .then(() => {
            if (!document.id) {
              return Promise.resolve()
                .then(() => this.cryptoService.generateId())
                .then((id) => document.id = id)
                .then(() => document.content = document.content || '');
            }

            return document;
          })
          .then(() => this.cryptoService.encrypt(document, certificate.key))
          .then((data:string) => {
            console.log('doc data', document);
            console.log('save data', data);
          });
      })
  }
}
