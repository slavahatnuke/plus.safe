import {Component} from '@angular/core';
// import { SignUpService } from "./sign-up.service";
// import { SignUp } from "./sign-up";
// import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  title = 'SignUp works!';
  // constructor(private signUpService: SignUpService, private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.data
  //   .map((data: { signUp: SignUp }) => data.signUp)
  //   .subscribe((signUp: SignUp) => console.log(signUp));
  // }

}
