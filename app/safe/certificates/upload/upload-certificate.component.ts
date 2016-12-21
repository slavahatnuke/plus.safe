import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'safe-upload-certificate',
  template: `

  <p>Upload your certificate</p>
  
  <form (ngSubmit)="save()">
    <input *ngIf="hasCertificate" type="password" name="password" [(ngModel)]="password" placeholder="Certificate password" required>
    <uploader [title]="'upload'" [multiple]="false" (onUpload)="onUpload($event)"></uploader>
    <button>Save</button>
  </form>
  
  <div *ngIf="error">
  {{error}}
  </div>
  
  <div *ngIf="wait">
  Please wait...
  </div>

`,
})
export class SafeUploadCertificateComponent {
  public error:string;
  public wait:boolean = false;

  public hasCertificate:boolean = false;
  public password:string = '';

  constructor(private userService:UserService, private router:Router) {
  }

  save() {
    this.error = '';
    this.wait = false;
  }


  onUpload($event:any) {

  }

}
