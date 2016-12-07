import {Component, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'uploader',
  template: `
<form>
  <label>
    <span style="cursor: pointer">{{title}}</span>
    <input style="display: none" (change)="onChange($event)" [multiple]="multiple" type="file" name="file" #file>
  </label>
</form>
`,
})
export class UploaderComponent {
  @ViewChild('file') file:ElementRef;

  @Input() title:string;
  @Input() multiple:boolean = false;
  @Output() onUpload:EventEmitter = new EventEmitter();

  read(file:File) {
    return new Promise((resolve, reject) => {
      var reader:FileReader = new FileReader();

      reader.onloadend = function (e) {
        resolve(reader.result);
      };

      reader.readAsText(file);
    });
  }

  onChange($event:any) {
    let promises:Promise<string>[] = [];

    var files = $event.target.files as FileList;

    for (var i = 0; i < files.length; i++) {
      promises.push(this.read(files[i]));
    }

    Promise.all(promises)
      .then((result) => {
        if (this.multiple) {
          return result;
        } else {
          return result[0];
        }
      })
      .then((text:string) => {
        this.onUpload.emit([text]);
      });
  }
}
