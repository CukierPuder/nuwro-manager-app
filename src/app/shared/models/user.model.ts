export class UserSignIn {
  constructor(
    public email: string,
    public password: string) { }
}

export class UserSignUp extends UserSignIn {
  constructor(
    public email: string,
    public password: string,
    public name: string) {
      super(email, password);
      this.name = name;
    }
}
