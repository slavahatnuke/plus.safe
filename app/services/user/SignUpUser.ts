export class SignUpUser {
  public name:string = '';
  public password:string = '';
  public password2:string = '';

  isValid() {
    return !!this.name && this.password === this.password2;
  }
}
