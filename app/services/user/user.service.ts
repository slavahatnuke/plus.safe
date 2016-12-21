import {Injectable} from '@angular/core';

import {SignUpUser} from './users/SignUpUser';
import {SignInUser} from './users/SignInUser';

import {CryptoService} from '../crypto/crypto.service';
import {LocalStorage} from '../storage/local/local.storage';
import {User} from "./users/User";
import {CryptoPairKey} from "../crypto/keys/CryptoPairKey";
import {DownloadService} from "../download/download.service";
import {StorageContainer} from "../storage/storage.container";
import {CryptoPasswordKey} from "../crypto/keys/CryptoPasswordKey";
import {IStorage} from "../storage/storage.interface";
import {CryptoPasswordEntityResult} from "../crypto/keys/CryptoPasswordEntityResult";
import {SafeCertificate} from "../certificate/certificates/SafeCertificate";

@Injectable()
export class UserService {
  private user:User|null;
  private key:CryptoPasswordKey|null;

  constructor(private cryptoService:CryptoService,
              private storageContainer:StorageContainer,
              private downloadService:DownloadService) {
  }

  hasUser() {
    return new Promise<boolean>((resolve) => {
      resolve(!!this.user)
    });
  }

  signUp(signUpUser:SignUpUser) {
    return this.signOut()
      .then(() => {
        let user = new User();

        user.name = signUpUser.name;
        user.email = signUpUser.email;

        return this.cryptoService.generatePairKey(user.name, user.email)
          .then((key:CryptoPairKey) => user.key = key)
          .then(() => this.cryptoService.encryptByPassword(user, signUpUser.password))
          .then((result:CryptoPasswordEntityResult) => this.key = result.key)
          .then(() => this.user = user)
          .then(() => this.saveIdentity())
          .then(() => this.user);
      });
  }

  signIn(user:SignInUser) {
    return user.getIdentity()
      .then((identity:string) => {
        if (identity) {
          return identity;
        } else {
          return this.getLocalStorage()
            .then((localStorage:IStorage) => localStorage.get('identity'));
        }
      })
      .then((identity:any) => identity || Promise.reject(new Error('No identity')))
      .then((identity:any) => this.cryptoService.decryptByPassword(identity, user.password))
      .then((result:CryptoPasswordEntityResult) => {
        this.user = new User();
        this.user.deserialize(result.data);
        this.key = result.key;

        console.log(this.user);
      })
      .then(() => this.saveIdentity())
  }

  signOut() {
    return Promise.resolve()
      .then(() => this.getLocalStorage())
      .then((localStorage) => localStorage.del('identity'))
      .then(() => this.lock());
  }

  lock():Promise<any> {
    return Promise.resolve()
      .then(() => this.user = null)
      .then(() => this.key = null);
  }

  hasIdentity():Promise<boolean> {
    return this.getLocalStorage()
      .then((localStorage) => localStorage.get('identity'))
      .then((identity) => !!identity);
  }

  download(name:string, data:any) {
    return this.encrypt(data).then((result) => this.downloadService.download(name, result));
  }

  encrypt(data:any):Promise<string> {
    return this.cryptoService.encrypt(data, this.user.key);
  }

  decrypt(data:string):Promise<any> {
    return this.cryptoService.decrypt(data, this.user.key);
  }

  downloadIdentity() {
    return this.cryptoService.encrypt(this.user, this.key)
      .then((data) => this.downloadService.safeDownload(this.user.name + '.identity.safe', data));
  }

  saveIdentity() {
    return this.cryptoService.encrypt(this.user, this.key)
      .then((identity:string) => {
        return this.getLocalStorage()
          .then((localStorage:IStorage) => localStorage.create('identity', identity));
      });
  }

  private getLocalStorage():Promise<LocalStorage> {
    return this.storageContainer.get('local');
  }

  verifyPassword(password:string):Promise<any> {
    return this.key.verifyPassword(password);
  }

  getUser():Promise<User> {
    return Promise.resolve(this.user);
  }

  addCertificate(certificate:SafeCertificate):Promise<SafeCertificate> {
    return Promise.resolve()
      .then(() => this.getUser())
      .then((user:User) => user.addCertificate(certificate))
      .then(() => this.saveIdentity())
      .then(() => certificate);
  }
}
