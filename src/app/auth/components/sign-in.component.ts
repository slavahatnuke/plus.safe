import {Component} from '@angular/core';
// import { SignInService } from "./sign-in.service";
// import { SignIn } from "./sign-in";
// import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  title = 'SignIn works!';
  // constructor(private signInService: SignInService, private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.data
  //   .map((data: { signIn: SignIn }) => data.signIn)
  //   .subscribe((signIn: SignIn) => console.log(signIn));
  // }

}
