export class SafeSessionDocument {
  id:string = '';
  certificateId:string = '';

  name:string = '';
  storageType:string = '';

  deserialize(data:any) {
    data = data as SafeSessionDocument;

    return Promise.resolve()
      .then(() => {
        this.id = data.id;
        this.certificateId = data.certificateId;
        this.name = data.name;
        this.storageType = data.storageType;
      })
      .then(() => this);
  }
}
