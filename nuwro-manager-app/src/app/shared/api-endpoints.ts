export class ApiEndpoints {
  private origin: string = 'http://172.18.0.3:8000/api';
  private userPrefix: string = 'user';
  private managerPrefix = 'manager';
  private experimentPrefix = 'experiments';
  private measurementPrefix = 'measurements';
  private nuwroversionPrefix = 'nuwroversions';

  // user api endpoints
  userSignIn(): string { return `${this.origin}/${this.userPrefix}/token/`; }
  userSignUp(): string { return `${this.origin}/${this.userPrefix}/create/`; }
  userAboutMe(): string { return `${this.origin}/${this.userPrefix}/me/`; }

  // experiment api endpoints
  experimentGetPost(): string { return `${this.origin}/${this.managerPrefix}/${this.experimentPrefix}/`; }
  experimentGet(id: number) { return `${this.origin}/${this.managerPrefix}/${this.experimentPrefix}/${id}/`; }

  // measurement api endpoints
  measurementGetPost(): string { return `${this.origin}/${this.managerPrefix}/${this.measurementPrefix}/`; }
  measurementGet(id: number) { return `${this.origin}/${this.managerPrefix}/${this.measurementPrefix}/${id}/`; }

  // nuwroversion api endpoints
  nuwroversionGetPost(): string { return `${this.origin}/${this.managerPrefix}/${this.nuwroversionPrefix}/`; }
  nuwroversionGet(id: number) { return `${this.origin}/${this.managerPrefix}/${this.nuwroversionPrefix}/${id}/`; }
}
