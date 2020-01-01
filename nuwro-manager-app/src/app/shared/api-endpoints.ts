import { environment } from '../../environments/environment';

export class ApiEndpoints {
  private host = environment.HOST_ADDR;
  private managerAPI = 'api/manager';
  private userAPI = 'api/user';
  private experiments = 'experiments';
  private measurements = 'measurements';
  private nuwroversions = 'nuwroversions';
  private datafiles = 'datafiles';
  private resultfiles = 'resultfiles';
  private artifacts = 'artifacts';


  getHostname(): string {
    return this.host + '/';
  }

  getFileURL(fileURL: string): string {
    return this.host + '/' + fileURL;
  }

  // user api endpoints
  userSignIn(): string { return `${this.host}/${this.userAPI}/token/`; }
  userSignUp(): string { return `${this.host}/${this.userAPI}/create/`; }
  userAboutMe(): string { return `${this.host}/${this.userAPI}/me/`; }

  // experiments api endpoints
  experimentGetPost(): string { return `${this.host}/${this.managerAPI}/${this.experiments}/`; }
  experimentGet(id: number): string { return `${this.host}/${this.managerAPI}/${this.experiments}/${id}/`; }
  experimentGetUrl(id: number): string { return `/${this.managerAPI}/${this.experiments}/${id}/`; }

  // measurement api endpoints
  measurementGetPost(): string { return `${this.host}/${this.managerAPI}/${this.measurements}/`; }
  measurementGet(id: number): string { return `${this.host}/${this.managerAPI}/${this.measurements}/${id}/`; }
  measurementGetUrl(id: number): string { return `/${this.managerAPI}/${this.measurements}/${id}/`; }

  // nuwroversion api endpoints
  nuwroversionGetPost(): string { return `${this.host}/${this.managerAPI}/${this.nuwroversions}/`; }
  nuwroversionGet(id: number): string { return `${this.host}/${this.managerAPI}/${this.nuwroversions}/${id}/`; }
  nuwroversionGetUrl(id: number): string { return `/${this.managerAPI}/${this.nuwroversions}/${id}/`; }

  // resultfile api endpoints
  resultfileGetAllPost(): string { return `${this.host}/${this.managerAPI}/${this.resultfiles}/`; }
  resultfileGet(id: number): string { return `${this.host}/${this.managerAPI}/${this.resultfiles}/${id}`; }
  resultfileGetUrl(id: number): string { return `/${this.managerAPI}/${this.resultfiles}/${id}`; }

  artifactGetAllPost(): string { return `${this.host}/${this.managerAPI}/${this.artifacts}/`; }
  artifactGet(id: number): string { return `${this.host}/${this.managerAPI}/${this.artifacts}/${id}`; }
  artifactGetUrl(id: number): string { return `${this.host}/${this.managerAPI}/${this.artifacts}/${id}`; }
}
