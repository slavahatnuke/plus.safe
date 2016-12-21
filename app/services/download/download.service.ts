import {Injectable} from '@angular/core';

declare var saveAs:any;

@Injectable()
export class DownloadService {
  download(name:string, data:any):Promise<any> {
    return new Promise((resolve, reject) => {
      let value = typeof data == 'string' ? data : JSON.stringify(data);
      let blob = new Blob([value], {type: "application/text;charset=utf-8"});
      saveAs(blob, name);
      resolve();
    });
  }

  safeDownload(name:string, data:any):Promise<any> {
    name = ('' + name).replace(/[^\.\w]+/igm, '_');
    return this.download(name, data);
  }
}
