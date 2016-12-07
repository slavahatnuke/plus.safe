import {Component} from '@angular/core';
import {SignInUser} from '../services/user/users/SignInUser';

import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'signin',
  template: `
<h1>Sign In</h1>

<div *ngIf="!busy" >
  <form (ngSubmit)="signIn()">
    <input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required>
    <button>Sign In</button>
  </form>

<div *ngIf="hasIdentity || error">
  <a routerLink="/signup" (click)="signOut()">Sign out</a>
</div>

</div>

<div *ngIf="busy">
please wait...
</div>

<div *ngIf="error">
{{error}}
</div>
`

})
export class SignInComponent {

  user:SignInUser;

  busy:boolean;
  error:string;
  hasIdentity:boolean = false;

  constructor(private userService:UserService,
              private router:Router) {

    this.user = new SignInUser();
    this.user.password = 'pass';

    this.userService.hasIdentity().then((yes) => this.hasIdentity = yes)
  }

  signIn() {
    this.busy = true;
    this.error = '';

    this.userService.signIn(this.user)
      .then(() => {
        this.router.navigate(['/safe']);
      })
      .catch((err) => {
        this.error = err;
      })
      .then(() => {
        this.busy = false;
      });
  }

  signOut() {
    this.userService.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
