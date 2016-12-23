import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'safe-certificates',
  template: `

  <div>
    <a routerLink="/safe/certificates/new">new</a>
    <a routerLink="/safe/certificates/upload">upload</a>
    <a routerLink="/safe/certificates/manage">manage</a>
  </div>
  
  <router-outlet></router-outlet>
`,
})
export class SafeCertificatesComponent implements OnInit {
  constructor(private router:Router) {
  }

  ngOnInit():void {
    this.router.navigate(['safe', 'certificates', 'manage']);
  }
}
