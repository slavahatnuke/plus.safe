import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {CertificateService} from "../../../services/certificate/certificate.service";

@Component({
  selector: 'safe-new-certificate',
  template: `

  <p>New certificate, this certificate will be used for document encription</p>
  
  <form (ngSubmit)="save()">
    <input type="text" name="name" [(ngModel)]="name" placeholder="Certificate name" required>
    <input type="password" name="password" [(ngModel)]="password" placeholder="Certificate password" required>
    <input type="password" name="password2" [(ngModel)]="password2" placeholder="re-enter certificate password" required>
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
export class SafeNewCertificateComponent {
  public error:string;
  public wait:boolean = false;

  public name:string = '';

  public password:string = '';
  public password2:string = '';

  constructor(private certificateService:CertificateService, private router:Router) {
  }

  save() {
    this.error = '';
    this.wait = false;

    if (this.name && this.password && this.password === this.password2) {
      this.wait = true;
      this.certificateService.generate(this.name, this.password)
        .then(() => this.wait = false)
        .then(() => this.router.navigate(['safe', 'certificates']))
    } else {
      this.error = 'Wrong passwords';
    }
  }

}
