import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'safe-certificates',
  template: `

  <div>
    <a routerLink="/safe/certificates/new">new</a>
    <a routerLink="/safe/certificates/upload">upload</a>
  </div>
  
  <router-outlet></router-outlet>
`,
})
export class SafeCertificatesComponent {
  public error:string;
  public wait:boolean = false;

  constructor(private router:Router) {
  }

}
