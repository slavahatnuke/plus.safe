import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../services/user/user.service";

declare var plusMergeText:any;

@Component({

  selector: 'safe',
  template: `<h2>Simple</h2>

<form>
  <textarea style="width: 400px; min-height: 200px" name="value" [(ngModel)]="value"></textarea>
</form>

<button (click)="save()">save</button>
<uploader [title]="'upload'" [multiple]="false" (onUpload)="onUpload($event)"></uploader>
`,
})
export class SafeSimpleComponent {

  public value:string = '';
  public snapshot:any;

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
    this.snapshot = plusMergeText.snapshot(this.value);
    this.userService.download('test', this.value)
  }

  onUpload($event:any) {
    this.userService.decrypt($event[0] || '').then((value) => {
      let snapshot = this.snapshot || plusMergeText.snapshot(this.value || '');
      this.value = snapshot.apply(value, this.value).toString();
      this.snapshot = plusMergeText.snapshot(this.value);
    });
  }
}
