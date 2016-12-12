export class SignInUser {
  public password:string = '';
  public identity:string = '';

  getIdentity():Promise<any> {
    return Promise.resolve(this.identity);
  }
}
