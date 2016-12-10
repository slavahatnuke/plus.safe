import {IStorage} from '../storage.interface';
import {Injectable} from '@angular/core';

declare var plus_safe_google_api_auth_on_ready:any;
declare var gapi:any;

@Injectable()
export class GoogleDriveStorage implements IStorage {
  private CLIENT_ID:string;
  private apiKey:string;
  private contentType:string;

  constructor() {
    this.CLIENT_ID = '755097429197-dhi9ujvmp4pjdu4b3gpjg73miosipod8.apps.googleusercontent.com';
    this.apiKey = 'AIzaSyBgthgF0XoDAEGoHxzq0vOl7kTo67ah0DQ';

    this.contentType = 'application/text';
  }

  auth() {
    return Promise.resolve()
      .then(() => {
        return new Promise((resolve) => {
          plus_safe_google_api_auth_on_ready.subscribe(resolve);
        });
      })
      .then(() => {
        var SCOPES = [
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive.metadata',
          'https://www.googleapis.com/auth/drive.appdata'
        ];

        return new Promise((resolve, reject) => {

          gapi.auth.authorize({
              'client_id': this.CLIENT_ID,
              'scope': SCOPES.join(' '),
              'immediate': true
            },
            (authResult:any) => {
              if (authResult && !authResult.error) {
                resolve();
              } else {
                reject();
              }
            });
        });
      })
      .then(() => {
        var promises:Promise<any>[] = [];

        promises.push(new Promise((resolve) => {
          gapi.client.load('drive', 'v3', resolve);
        }));

        promises.push(new Promise((resolve) => {
          gapi.load('picker', {'callback': resolve});
        }));

        return Promise.all(promises);
      })
      .then(() => {
        console.log('I have API');
      })
  }

  create(name:string, value:any):Promise<string> {
    return Promise.resolve()
      .then(() => {
        return new Promise((resolve, reject) => {
          gapi.client
            .request({
              'path': '/upload/drive/v3/files',
              'method': 'POST',
              'params': {
                uploadType: 'media'
              },
              'headers': {
                'Content-Type': this.contentType
              },
              'body': JSON.stringify(value)
            })
            .execute((file:any) => {
              file.id ? resolve(file.id) : reject();
            });
        })
      })
      .then((id:string) => {
        return Promise.resolve()
          .then(() => {
            return new Promise((resolve, reject) => {
              gapi.client.drive.files
                .update({
                  'fileId': id,
                  'name': name
                })
                .execute((file:any) => {
                  file.id ? resolve(file.id) : reject();
                });
            });
          })
          .then(() => id);
      });
  }

  set(id:string, value:any):Promise<boolean> {
    return new Promise((resolve, reject) => {
      gapi.client
        .request({
          'path': 'https://www.googleapis.com/upload/drive/v3/files/' + id,
          'method': 'PATCH',
          'params': {
            uploadType: 'media'
          },
          'headers': {
            'Content-Type': this.contentType
          },
          'body': JSON.stringify(value)
        })
        .execute(function (file:any) {
          file.id ? resolve(file.id) : reject();
        });
    });
  }

  get(id:string):Promise<any> {
    return new Promise((resolve, reject) => {

      /// @@@@ refactor to A2
      let accessToken = gapi.auth.getToken().access_token;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://www.googleapis.com/drive/v3/files/' + id + '?alt=media');

      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      xhr.onload = function () {
        try {
          resolve(JSON.parse(xhr.response));
        } catch (err) {
          reject(err);
        }
      };

      xhr.onerror = function () {
        reject();
      };
      xhr.send();
    })
  }

  del(id:string):Promise<boolean> {
    return Promise.resolve()
      .then(() => {
        return new Promise((resolve, reject) => {
          gapi.client.drive.files
            .delete({
              'fileId': id
            })
            .execute((info:any) => {
              resolve();
            });
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          gapi.client
            .request({
              'path': 'https://www.googleapis.com/drive/v3/files/trash',
              'method': 'DELETE'
            })
            .execute(() => {
              resolve();
            });
        });
      })
  }
}
