export class SignUpUser {
  public name:string = '';
  public email:string = '';
  public password:string = '';
  public password2:string = '';
  public useIdentityFile:boolean = false;

  isValid() {
    return !!this.name && !!this.email && this.password && this.password === this.password2;
  }
}
