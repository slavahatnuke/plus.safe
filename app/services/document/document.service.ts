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

  private storage: IStorage;

  constructor(private userService: UserService,
              private storageContainer: StorageContainer,
              private cryptoService: CryptoService,
              private certificateService: CertificateService) {

  }

  load(): Promise<DocumentService> {
    return Promise.resolve()
      .then(() => {
        return this.storageContainer.get('drive')
          .then((storage: any) => storage.auth())
          .then((storage: IStorage) => this.storage = storage)
          .then(() => this);
      });
  }

  getDocuments(): Promise<SafeDocument[]> {
    return this.userService.getSession()
      .then((session: SafeSession) => {
        return Promise.all(session.documents.map((doc: SafeSessionDocument) => {
          return new SafeDocument().deserialize(doc);
        }));
      });
  }

  save(document: SafeDocument) {
    return this.certificateService.getCertificateById(document.certificateId)
      .then((certificate: SafeCertificate) => {
        return Promise.resolve()
          .then(() => {
            if (!document.id) {
              return Promise.resolve()
                .then(() => this.cryptoService.generateId())
                .then((id) => document.id = id)
                .then(() => document.content = document.content || '');
            }
          })
          .then(() => this.addDocument(document))
          .then(() => this.cryptoService.encrypt(document, certificate.key))
          .then((data: string) => {
            return this.load().then(() => {
              let promise: Promise<any>;

              if (document.storageId) {
                promise = this.storage.create(document.name, data)
                  .then((storageId: string) => document.storageId = storageId);
              } else {
                promise = this.storage.set(document.storageId, data)
              }

              return promise;
            });
          })
          .then(() => this.addDocument(document))
          .then(() => document);
      })
  }

  private addDocument(document: SafeDocument) {
    return this.userService.getSession()
      .then((session: SafeSession) => session.addDocument(document))
      .then(() => this.userService.saveSession());
  }

}
