export class AuthToken {
  constructor(public token: string) { }

  validateToken(): boolean {
    return true;
  }
}
