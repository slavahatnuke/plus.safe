import {Injectable} from '@angular/core';

@Injectable()
export class DownloadService {
  download(name:string, data:any) {
    location.href = 'data:application/text, ' + encodeURIComponent(JSON.stringify(data));
  }
}
