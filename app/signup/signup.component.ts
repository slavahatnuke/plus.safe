import {Component} from '@angular/core';
import {SignUpUser} from '../services/user/SignUpUser';

import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'signup',
  template: `
<h1>Sign Up</h1>

<div *ngIf="!busy" >
  <form (ngSubmit)="signUp()">
    <input type="text" placeholder="Name" name="name" [(ngModel)]="user.name" required>
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

  constructor(private userService:UserService,
              private router:Router) {
    this.user = new SignUpUser();
    this.user.name = 'test';
    this.user.password = 'pass1';
    this.user.password2 = 'pass1';

    this.userService.isSignedUp().then((yes) => {
      if (yes) {
        this.router.navigate(['/signin']);
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
      this.error = 'Invalid user';
    }
  }

}
