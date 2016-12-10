export interface IStorage {
  create(name:string, value:any):Promise<string>;
  set(id:string, value:any):Promise<boolean>;
  get(id:string):Promise<any>;
  del(id:string):Promise<boolean>;
}
