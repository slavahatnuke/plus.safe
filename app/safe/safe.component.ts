import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'safe',
  template: `<h1>Safe</h1>
  <a routerLink="/safe-test">Safe test app</a>
`,
})
export class SafeComponent {

  constructor(private router:Router,
              private userService:UserService) {

    this.userService.hasUser()
      .then((has) => {
        if (!has) {
          this.router.navigate(['/signin']);
        }
      });
  }

}
