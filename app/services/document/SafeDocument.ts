export class SafeDocument {
  public id:string = '';
  public certificateId:string = '';

  public name:string = '';
  public storageType:string = 'drive';
  public storageId:string;

  public type:string = 'text';
  public content:any;

  public loaded:boolean = false;

  deserialize(data:any):Promise<SafeDocument> {
    data = data as SafeDocument;

    return Promise.resolve()
      .then(() => {
        this.id = data.id;
        this.certificateId = data.certificateId;
        this.name = data.name;
        this.storageType = data.storageType;
        this.type = data.type;
        this.storageId = data.storageId;
      })
      .then(() => this);
  }
}
