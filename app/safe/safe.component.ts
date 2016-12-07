import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'safe',
  template: `<h1>Safe</h1>`,
})
export class SafeComponent {
  constructor(private router:Router) {
    this.router.navigate(['/']);
  }
}
