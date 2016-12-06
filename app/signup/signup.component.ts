import {Component} from '@angular/core';
import {SignUpUser} from './SignUpUser';

declare var openpgp:any;

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
`

})
export class SignUpComponent {

  user:SignUpUser;

  busy:boolean;

  constructor() {
    this.user = new SignUpUser();
  }

  signUp() {
    this.busy = true;
    if (this.user.isValid()) {
      console.log('valid');
      this.downloadKey();
    } else {
      this.busy = false;
    }
  }

  downloadKey() {
    openpgp.initWorker({path: 'node_modules/openpgp/dist/openpgp.worker.js'});

    let options = {
      userIds: [{name: this.user.name, email: this.user.email}],
      numBits: 2048,
      passphrase: this.user.password
    };

    this.busy = true;

    try {
      openpgp.generateKey(options)
        .then((key) => {
          var key = {
            'private': key.privateKeyArmored,
            'public': key.publicKeyArmored,
          };

          location.href = 'data:application/text, ' + encodeURIComponent(JSON.stringify(key));
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    } catch (err) {
      console.log(err);
      this.busy = false;
    }
  }
}
