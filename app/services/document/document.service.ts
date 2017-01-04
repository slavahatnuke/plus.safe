import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";
import {StorageContainer} from "../storage/storage.container";
import {CryptoService} from "../crypto/crypto.service";
import {IStorage} from "../storage/storage.interface";
import {SafeDocument} from "./SafeDocument";
import {CertificateService} from "../certificate/certificate.service";
import {SafeCertificate} from "../certificate/certificates/SafeCertificate";
import {SafeSession} from "../user/session/SafeSession";
import {SafeSessionDocument} from "../user/session/SafeSessionDocument";

@Injectable()
export class DocumentService {

  private storage:IStorage;

  constructor(private userService:UserService,
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
    return this.userService.getSession()
      .then((session:SafeSession) => {
        console.log('session.documents', session.documents);
        console.log('session', session);

        return Promise.all(session.documents.map((doc:SafeSessionDocument) => {
          return new SafeDocument().deserialize(doc);
        }));
      });
  }


  addDocument(document:SafeDocument) {
    console.log('addDocument', document);

    return this.userService.getSession()
      .then((session:SafeSession) => session.addDocument(document))
      .then(() => this.userService.saveSession());
  }

  save(document:SafeDocument) {
    console.log('save', document);

    return this.certificateService.getCertificateById(document.certificateId)
      .then((certificate:SafeCertificate) => {
        return Promise.resolve()
          .then(() => {
            if (!document.id) {
              return Promise.resolve()
                .then(() => this.cryptoService.generateId())
                .then((id) => document.id = id)
                .then(() => document.content = document.content || '')
                .then(() => document);
            }

            return document;
          })
          .then((document:SafeDocument) => this.addDocument(document))
          .then(() => this.cryptoService.encrypt(document, certificate.key))
          .then((data:string) => {
            console.log('doc data', document);
            console.log('save data', data);
          });
      })
  }
}
