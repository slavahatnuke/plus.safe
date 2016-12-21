import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CertificateService} from "../../../services/certificate/certificate.service";

@Component({
  selector: 'safe-upload-certificate',
  template: `

  <p>Upload your certificate</p>
  
  <form (ngSubmit)="save()">
    <input *ngIf="certificate" type="password" name="password" [(ngModel)]="password" placeholder="Certificate password" required>
    <uploader *ngIf="!certificate" [title]="'upload'" [multiple]="false" (onUpload)="onUpload($event)"></uploader>
    <button *ngIf="certificate">Save</button>
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

  public certificate:string;
  public password:string = '';

  constructor(private certificateService:CertificateService, private router:Router) {
  }

  save() {
    this.error = '';
    this.wait = true;

    this.certificateService.addCertificate(this.certificate, this.password)
      .then(() => this.router.navigate(['safe', 'certificates']))
      .catch((err) => this.error = err)
      .then(() => this.wait = false)
  }


  onUpload($event:any) {
    if ($event[0]) {
      this.certificate = $event[0];
    }
  }

}
