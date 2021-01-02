import { environment } from '../../environments/environment';

export class ApiEndpoints {
  private host = environment.HOST_ADDR;
  private apiPrefix = 'api';
  private userPrefix = 'user';
  private managerPrefix = 'manager';
  private experimentPrefix = 'experiments';
  private measurementPrefix = 'measurements';
  private nuwroversionPrefix = 'nuwroversions';
  private datafilePrefix = 'artifacts';
  private resultfilePrefix = 'resultfiles';


  getHostname(): string {
    return this.host + '/';
  }

  getHostnameWoTrailingSlash(): string {
    return this.host;
  }

  getFileURL(fileURL: string): string {
    return this.host + '/' + fileURL;
  }

  getFileURNoTrailingSlashAfterHost(fileURL: string): string {
    return this.host + fileURL;
  }

  // user api endpoints
  userSignIn(): string { return `${this.host}/${this.apiPrefix}/${this.userPrefix}/token/`; }
  userSignUp(): string { return `${this.host}/${this.apiPrefix}/${this.userPrefix}/create/`; }
  userAboutMe(): string { return `${this.host}/${this.apiPrefix}/${this.userPrefix}/me/`; }

  // experiment api endpoints
  experimentGetPost(): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.experimentPrefix}/`; }
  experimentGet(id: number): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.experimentPrefix}/${id}/`; }
  experimentGetUrl(id: number): string { return `/${this.apiPrefix}/${this.managerPrefix}/${this.experimentPrefix}/${id}/`; }

  // measurement api endpoints
  measurementGetPost(): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.measurementPrefix}/`; }
  measurementGet(id: number): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.measurementPrefix}/${id}/`; }
  measurementGetUrl(id: number): string { return `/${this.apiPrefix}/${this.managerPrefix}/${this.measurementPrefix}/${id}/`; }

  // nuwroversion api endpoints
  nuwroversionGetPost(): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.nuwroversionPrefix}/`; }
  nuwroversionGet(id: number): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.nuwroversionPrefix}/${id}/`; }
  nuwroversionGetUrl(id: number): string { return `/${this.apiPrefix}/${this.managerPrefix}/${this.nuwroversionPrefix}/${id}/`; }

  // datafile api endpoints
  datafileGetAllPost(): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.datafilePrefix}/`; }
  datafileGet(id: number): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.datafilePrefix}/${id}`; }
  datafileGetUrl(id: number): string { return `/${this.apiPrefix}/${this.managerPrefix}/${this.datafilePrefix}/${id}`; }

  // resultfile api endpoints
  resultfileGetAllPost(): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.resultfilePrefix}/`; }
  resultfileGet(id: number): string { return `${this.host}/${this.apiPrefix}/${this.managerPrefix}/${this.resultfilePrefix}/${id}`; }
  resultfileGetUrl(id: number): string { return `/${this.apiPrefix}/${this.managerPrefix}/${this.resultfilePrefix}/${id}`; }
}
