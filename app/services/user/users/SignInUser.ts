export class SignInUser {
  public password:string = '';
  public identity:string = '';

  getIdentity() {
    return new Promise((resolve, reject) => {
      if(!this.identity) {
        return reject();
      }
      
      resolve(this.identity);
    });
  }
}
