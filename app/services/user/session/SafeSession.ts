import {SafeSessionDocument} from "./SafeSessionDocument";
import {SafeDocument} from "../../document/SafeDocument";

export class SafeSession {
  documents:SafeSessionDocument[] = [];

  deserialize(data:any):Promise<SafeSession> {
    data = data as SafeSession;

    return Promise.resolve()
      .then(() => {
        let promises:Promise<SafeSessionDocument>[];

        promises = (data.documents || [])
          .map((data:any) => {
            let certificate = new SafeSessionDocument();
            return certificate.deserialize(data);
          });

        return Promise.all(promises)
          .then((documents:SafeSessionDocument[]) => this.documents = documents);
      })
      .then(() => this);
  }

  addDocument(document:SafeDocument) {

    console.log('addDocument', document);

    return Promise.resolve().then(() => {
      let foundDoc = this.documents.find((aDocument) => {
        return aDocument.id === document.id;
      });

      let doc = foundDoc || new SafeSessionDocument();

      doc.id = document.id;
      doc.storageType = document.storageType;
      doc.certificateId = document.certificateId;
      doc.name = document.name;

      console.log('doct to push', doc);
      if (!foundDoc) {
        this.documents.push(doc);
      }

      console.log('after push', this);
    });
  }
}
