export interface IStorage {
  set(name:string, value:any):Promise<boolean>;
  get(name:string):Promise<any>;
  del(name:string):Promise<boolean>;
}
