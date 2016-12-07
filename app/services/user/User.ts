export class User {
  public name:string = '';
  public salt:string = '';
  public private:string = '';

  serialize() {
    return new Promise((resolve) => {
      resolve({
        name: this.name,
        salt: this.salt,
        private: this.private
      });
    });
  }

  deserialize(data:any) {
    return new Promise((resolve, reject) => {
      if (!data || typeof data !== 'object') {
        return reject();
      }

      this.name = data.name || '';
      this.salt = data.salt || '';
      this.private = data.private || '';

      resolve();
    });
  }
}
