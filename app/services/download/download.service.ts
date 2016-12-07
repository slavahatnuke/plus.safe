import {Injectable} from '@angular/core';

declare var saveAs:any;

@Injectable()
export class DownloadService {
  download(name:string, data:any) {
    return new Promise((resolve, reject) => {
      var blob = new Blob([JSON.stringify(data)], {type: "application/text;charset=utf-8"});
      saveAs(blob, name);
      resolve();
    });
  }
}
