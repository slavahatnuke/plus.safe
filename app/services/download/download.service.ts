import {Injectable} from '@angular/core';

@Injectable()
export class DownloadService {
  download(name:string, data:any) {
    return new Promise((resolve, reject) => {
      location.href = 'data:application/text, ' + encodeURIComponent(JSON.stringify(data));
      resolve();
    });
  }
}
