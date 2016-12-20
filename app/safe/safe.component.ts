import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'safe',
  template: `<h1>Safe</h1>
  <a routerLink="/safe/identity">Identity</a>
  <a routerLink="/safe/simple">Simple</a>
  
  <a (click)="lock()" routerLink="/signin">Lock</a>
  <a (click)="signOut()" routerLink="/signin">Signout</a>
  
  <router-outlet></router-outlet>
`,
})
export class SafeComponent {

  constructor(private router:Router,
              private userService:UserService) {

    this.userService.hasUser()
      .then((has) => {
        if (!has) {
          this.goSignIn();
        }
      });
  }

  private goSignIn() {
    this.router.navigate(['/signin']);
  }

  lock() {
    this.userService.lock().then(() => this.goSignIn())
  }

  signOut() {
    this.userService.signOut().then(() => this.goSignIn())
  }
}
