import {Component} from '@angular/core';
import {SignUpUser} from '../services/user/users/SignUpUser';

import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'signup',
  template: `
<h1>Identity</h1>

<div *ngIf="!busy" >
  <form (ngSubmit)="signUp()">
    <input type="text" placeholder="Name" name="name" [(ngModel)]="user.name" required>
    <input type="email" placeholder="Email" name="email" [(ngModel)]="user.email" required>
    <input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required>
    <input type="password" placeholder="Re-enter password" name="password2" [(ngModel)]="user.password2" required>
    <button>sign in</button>
  </form>

  <a routerLink="/signin">Do you have Identity?</a>
</div>

<div *ngIf="busy">
<p>Identity and certificates are being generated.</p>
<p>pleas wait...</p>
</div>

<div *ngIf="error">
{{error}}
</div>
`

})
export class SignUpComponent {

  user:SignUpUser;

  busy:boolean;
  error:string;

  constructor(private userService:UserService,
              private router:Router) {
    this.user = new SignUpUser();
    this.user.name = 'test';
    this.user.email = 'email@email.com';
    this.user.password = 'pass';
    this.user.password2 = 'pass';

    this.userService.hasUser()
      .then((has) => {
        if (has) {
          this.router.navigate(['/signin']);
        } else {
          return this.userService.hasIdentity().then((has) => {
            if (has) {
              this.router.navigate(['/signin']);
            }
          });
        }
      });
  }

  signUp() {
    this.busy = true;
    this.error = '';

    if (this.user.isValid()) {
      this.userService.signUp(this.user)
        .then(() => {
          this.router.navigate(['/safe']);
        })
        .catch((err) => {
          this.error = err;
        })
        .then(() => {
          this.busy = false;
        });
    } else {
      this.busy = false;
      this.error = 'Invalid identity';
    }
  }

}
