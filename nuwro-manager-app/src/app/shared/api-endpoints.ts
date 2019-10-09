export class ApiEndpoints {
  private origin: string = 'http://172.18.0.3:8000/api';
  private userEndpointPrefix: string = 'user';

  // user api endpoints
  userSignIn(): string { return `${this.origin}/${this.userEndpointPrefix}/token/`; }
  userSignUp(): string { return `${this.origin}/${this.userEndpointPrefix}/create/`; }
  userAboutMe(): string { return `${this.origin}/${this.userEndpointPrefix}/me/`; }
}
