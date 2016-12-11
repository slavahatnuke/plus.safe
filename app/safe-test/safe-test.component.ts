import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'safe',
  template: `<h1>Safe</h1>

<form>
  <textarea style="width: 400px; min-height: 200px" name="value" [(ngModel)]="value"></textarea>
</form>

<button (click)="save()">save</button>
<uploader [title]="'upload'" [multiple]="false" (onUpload)="onUpload($event)"></uploader>
`,
})
export class SafeTestComponent {

  public value:string;

  constructor(private router:Router,
              private userService:UserService) {

    this.userService.hasUser()
      .then((has) => {
        if (!has) {
          this.router.navigate(['/signin']);
        }
      });
  }

  save() {
    this.userService.download('test', this.value)
  }

  onUpload($event:any) {
    this.userService.decrypt($event[0] || '').then((value) => this.value = value);
  }
}
