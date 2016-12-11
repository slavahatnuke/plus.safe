export class SignInUser {
  public password:string = '';
  public identity:string = '';

  getIdentity() {
    return Promise.resolve().then(() => this.identity || Promise.reject('Without Identity'));
  }
}
