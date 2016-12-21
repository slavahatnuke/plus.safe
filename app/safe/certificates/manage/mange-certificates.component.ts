import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CertificateService} from "../../../services/certificate/certificate.service";
import {SafeCertificate} from "../../../services/certificate/certificates/SafeCertificate";

@Component({
  selector: 'safe-manage-certificates',
  template: `

  <p>Manage certificates</p>
  <ul>
    <li *ngFor="let certificate of certificates">
      {{certificate.name}} <button (click)="remove(certificate)">[x]</button>
    </li>
  </ul>
`,
})
export class SafeManageCertificatesComponent implements OnInit {
  public error:string;
  public wait:boolean = false;

  public certificates:SafeCertificate[] = [];

  constructor(private router:Router, private certificateService:CertificateService) {
  }

  ngOnInit():void {
    this.load();
  }

  load() {
    return this.certificateService.getCertificates()
      .then((certificates:SafeCertificate[]) => this.certificates = certificates)
  }

  remove(certificate:SafeCertificate) {
    return Promise.resolve()
      .then(() => this.certificateService.remove(certificate))
      .then(() => this.load());
  }

}
