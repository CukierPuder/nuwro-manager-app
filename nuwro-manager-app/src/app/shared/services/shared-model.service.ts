import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../api-endpoints';
import { SharedModel } from '../models/shared-model.model';

@Injectable({
  providedIn: 'root'
})
export class SharedModelService {
  /**
   * SharedModelService is responsible for handling API actions for all SharedModel based
   * models, i.e. Experiment, Measurement, and Nuwroversion - as all of them are exact same.
   * To make this work post, getAll, and get methods require additional 'model' parameter to
   * allow private functions, like: generatePostGetAllURL and generateGetURL generate proper
   * URL address
   */
  private httpHeaders: HttpHeaders;
  private apiEndpoints: ApiEndpoints;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.apiEndpoints = new ApiEndpoints();
  }

  post(model: string = 'experiment' || 'measurement' || 'nuwroversion', modelInstance: SharedModel): Observable<SharedModel> {
    this.refreshHttpHeaders();
    const formData = new FormData();
    formData.append('name', modelInstance.name);
    const url: string = this.generatePostGetAllURL(model);

    return this.http.post<SharedModel>(url, formData, { headers: this.httpHeaders });
  }

  getAll(model: string = 'experiment' || 'measurement' || 'nuwroversion', ): Observable<Array<SharedModel>> {
    this.refreshHttpHeaders();
    const url = this.generatePostGetAllURL(model);
    return this.http.get<Array<SharedModel>>(url, { headers: this.httpHeaders });
  }

  get(model: string = 'experiment' || 'measurement' || 'nuwroversion', id: number): Observable<SharedModel> {
    this.refreshHttpHeaders();
    const url = this.generateGetURL(model, id);
    return this.http.get<SharedModel>(url, { headers: this.httpHeaders });
  }

  private refreshHttpHeaders(): void {
    this.httpHeaders = new HttpHeaders()
      .set('Authorization', `token ${this.cookieService.get('authToken')}`);
  }

  private generatePostGetAllURL(model: string = 'experiment' || 'measurement' || 'nuwroversion'): string {
    if (model === 'experiment') {
      return this.apiEndpoints.experimentGetPost();
    } else if (model === 'measurement') {
      return this.apiEndpoints.measurementGetPost();
    } else if (model === 'nuwroversion') {
      return this.apiEndpoints.nuwroversionGetPost();
    }
  }

  private generateGetURL(model: string = 'experiment' || 'measurement' || 'nuwroversion', id: number): string {
    if (model === 'experiment') {
      return this.apiEndpoints.experimentGet(id);
    } else if (model === 'measurement') {
      return this.apiEndpoints.measurementGet(id);
    } else if (model === 'nuwroversion') {
      return this.apiEndpoints.nuwroversionGet(id);
    }
  }
}
