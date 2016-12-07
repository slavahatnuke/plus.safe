import {Component} from '@angular/core';
import {SignInUser} from '../services/user/SignInUser';

import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'signin',
  template: `
<h1>Sign In</h1>

<div *ngIf="!busy" >
  <form (ngSubmit)="signIn()">
    <input type="text" placeholder="Name" name="name" [(ngModel)]="user.name" required>
    <input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required>
    <button>Sign In</button>
  </form>

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

  constructor(private userService:UserService,
              private router:Router) {
    this.user = new SignInUser();
  }

  signIn() {
    this.busy = true;
    this.error = '';

    this.userService.signIn(this.user)
      .then(() => {
        // redirect to safe
      })
      .catch((err) => {
        this.error = err;
      })
      .then(() => {
        this.busy = false;
      });
  }
}
