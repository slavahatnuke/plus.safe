import {IStorage} from '../storage.interface';
import {Injectable} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class LocalStorage implements IStorage {

  constructor(private localStorageService:LocalStorageService) {}

  set(name:string, value:any):Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.localStorageService.set(name, value))
    })
  }

  get(name:string):Promise<any> {
    return new Promise((resolve, reject) => {
    })
  }

  del(name:string):Promise<boolean> {
    return new Promise((resolve, reject) => {

    })
  }
}
