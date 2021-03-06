import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SafeDocument} from "../../../services/document/SafeDocument";
import {DocumentService} from "../../../services/document/document.service";
import {SafeCertificate} from "../../../services/certificate/certificates/SafeCertificate";
import {CertificateService} from "../../../services/certificate/certificate.service";

@Component({
  selector: 'safe-new-documents',
  template: `

  <h4>New Document</h4>
  <form (ngSubmit)="save()" *ngIf="certificates.length">
    <input type="text" placeholder="name" name="name" [(ngModel)]="document.name" required>
    <select [(ngModel)]="document.certificateId" name="certificateId" required>
        <option *ngFor="let certificate of certificates" [value]="certificate.id">{{certificate.name}}</option>
    </select>
    <button>save</button>
  </form>
  
  <div *ngIf="!certificates.length">
    <p>
    Not certifates, please make or upload certificate.
    </p>
    
    <a routerLink="/safe/certificates">Certificates</a>
  </div>
`,
})
export class SafeNewDocumentComponent implements OnInit {

  public document:SafeDocument;
  public certificates:SafeCertificate[] = [];

  public error:string;
  public wait:boolean = false;

  constructor(private router:Router,
              private documentService:DocumentService,
              private certificateService:CertificateService) {

    this.document = new SafeDocument;
  }


  ngOnInit():void {
    this.certificateService.getCertificates()
      .then((certificates:SafeCertificate[]) => this.certificates = certificates)
      .then(() => {
        if (this.certificates.length) {
          this.document.certificateId = this.certificates[0].id;
        }
      });
  }

  save() {
    this.error = '';
    this.wait = false;

    this.documentService.save(this.document)
      .catch((err) => this.error = err)
      .then(() => {
        this.wait = false;
      })
      .then(() => this.router.navigate(['safe', 'documents']));
  }
}
