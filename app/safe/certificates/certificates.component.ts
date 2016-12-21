import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SafeCertificate} from "../../services/certificate/certificates/SafeCertificate";
import {CertificateService} from "../../services/certificate/certificate.service";

@Component({
  selector: 'safe-certificates',
  template: `

  <div>
    <a routerLink="/safe/certificates/new">new</a>
    <a routerLink="/safe/certificates/upload">upload</a>
    <a routerLink="/safe/certificates/manage">manage</a>
  </div>
  
  <router-outlet></router-outlet>
`,
})
export class SafeCertificatesComponent {
  constructor(private router:Router, private certificateService:CertificateService) {
  }
}
