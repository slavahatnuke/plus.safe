import {Component} from '@angular/core';
import {SignInUser} from '../services/user/users/SignInUser';

import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';
import {StorageContainer} from "../services/storage/storage.container";

@Component({
  selector: 'signin',
  template: `
<h1>Sign In</h1>

<div *ngIf="!busy" >
  <form (ngSubmit)="signIn()" *ngIf="hasIdentity">
    <input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required>
    <button>Sign In</button>
  </form>

  <div *ngIf="hasIdentity">
    <p>You have identity</p>
    <a routerLink="/signup" (click)="signOut()">Sign out</a>
  </div>
  
  <div *ngIf="!hasIdentity">
    <p>You have no identity, you can sign up or upload it</p>
    <a routerLink="/signup" (click)="signOut()">Sign up</a>
    <uploader [title]="'Upload identity'" [multiple]="false" (onUpload)="setIdentity($event)"></uploader>
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
              private router:Router,
              private storageContainer:StorageContainer) {

    this.user = new SignInUser();
    this.user.password = 'pass';

    storageContainer.get('drive')
      .then((storage) => {
        var name2 = 'ng-' + Math.random() + '.txt';

          return Promise.resolve()
          .then(() => storage.create(name2, Math.random()))
          .then((id) => {
            return Promise.resolve()
              .then(() => storage.get(id))
              .then((content:any) => console.log(content))
              .then(() => storage.set(id, 'ok-' + Math.random()))

              .then(() => storage.get(id))
              .then((content:any) => console.log('>> updated', content, name2))
              .then(() => storage.del(id))
          })
      });

    this.userService.hasIdentity().then((has) => this.hasIdentity = has);

    this.userService.hasUser().then((yes) => {
      if (yes) {
        this.router.navigate(['/safe']);
      }
    });

  }

  setIdentity($event:any) {
    this.user.identity = $event[0] || '';
    this.hasIdentity = true;
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
