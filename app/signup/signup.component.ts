import {Component} from '@angular/core';
import {SignUpUser} from '../services/user/SignUpUser';

import {UserService} from '../services/user/user.service';

@Component({
  selector: 'signup',
  template: `
<h1>Sign Up</h1>

<div *ngIf="!busy" >
  <form (ngSubmit)="signUp()">
    <input type="text" placeholder="Name" name="name" [(ngModel)]="user.name" required>
    <input type="email" placeholder="Email" name="email" [(ngModel)]="user.email" required>
    <input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required>
    <input type="password" placeholder="Re-enter password" name="password2" [(ngModel)]="user.password2" required>
    <button>SignUp</button>
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
export class SignUpComponent {

  user:SignUpUser;

  busy:boolean;
  error:string;

  constructor(private userService:UserService) {
    this.user = new SignUpUser();
  }

  signUp() {
    this.busy = true;
    this.error = '';

    if (this.user.isValid()) {
      this.userService.signUp(this.user)
        .then(() => {
          // redirect to safe
        })
        .catch((err) => {
          this.error = err;
        })
        .then(() => {
          this.busy = false;
        });
    } else {
      this.busy = false;
      this.error = 'Invalid user';
    }
  }

}
