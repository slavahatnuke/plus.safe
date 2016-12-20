import {Component} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'safe-identity',
  template: `

  <p>Please enter password to download identity</p>
  
  <form (ngSubmit)="save()">
    <input type="password" placeholder="Password" name="password" [(ngModel)]="password" required>
    <button>download identity</button>
  </form>

  <div *ngIf="error">
  {{error}}
  </div>
  
  <div *ngIf="wait">
  Please wait...
  </div>

`,
})
export class SafeIdentityComponent {

  public password:string;
  public error:string;
  public wait:boolean = false;

  constructor(private userService:UserService, private router:Router) {
  }

  save() {
    this.error = '';
    this.wait = true;
    this.userService.verifyPassword(this.password)
      .then(() => this.userService.downloadIdentity())
      .then(() => this.router.navigate(['/safe']))
      .catch(() => this.error = 'Wrong password')
      .then(() => this.wait = false)
  }
}
