export class SignUpUser {
  public name:string = '';
  public email:string = '';
  public password:string = '';
  public password2:string = '';

  isValid() {
    return !!this.name && !!this.email && this.password && this.password === this.password2;
  }
}
