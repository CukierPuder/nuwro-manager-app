import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiEndpoints } from '../api-endpoints';
import { Resultfile } from '../models/resultfile.model';
import { Experiment } from '../models/experiment.model';
import { Measurement } from '../models/measurement.model';

@Injectable({
  providedIn: 'root'
})
export class ResultfileService {
  private httpHeaders: HttpHeaders;
  private apiEndpoints: ApiEndpoints;

  constructor(
    private client: HttpClient,
    private cookieService: CookieService
  ) {
    this.apiEndpoints = new ApiEndpoints();
  }

  public getAll(): Observable<Array<Resultfile>> {
    this.refreshHttpHeaders();
    return this.client.get<Array<Resultfile>>(this.apiEndpoints.resultfileGetAllPost(), { headers: this.httpHeaders });
  }

  public post(resultfile: Resultfile): Observable<Resultfile> {
    this.refreshHttpHeaders();
    const formData = new FormData();
    formData.append('experiment', resultfile.experiment.id.toString());
    formData.append('measurement', resultfile.measurement.id.toString());
    formData.append('nuwroversion', resultfile.nuwroversion.id.toString());
    formData.append('is_3d', resultfile.is3dToString());
    formData.append('description', resultfile.description);
    formData.append('x_axis', resultfile.x_axis);
    formData.append('y_axis', resultfile.y_axis);
    formData.append('result_file', resultfile.result_file);

    return this.client.post<Resultfile>(this.apiEndpoints.resultfileGetAllPost(), formData, { headers: this.httpHeaders });
  }

  public filter(experiment: Experiment, measurement: Measurement): Observable<Array<Resultfile>> {
    this.refreshHttpHeaders();
    const params = new HttpParams()
      .set('experiment', experiment.id.toString())
      .set('measurement', measurement.id.toString());
    const options = { params: params, headers: this.httpHeaders }
    return this.client.get<Array<Resultfile>>(this.apiEndpoints.resultfileGetAllPost(), options);
  }

  public downloadFile(url: string): Observable<File> {
    const requestOptions: Object = {
      responseType: 'text'
    }
    
    return this.client.get<File>(url, requestOptions);
  }

  private refreshHttpHeaders(): void {
    this.httpHeaders = new HttpHeaders()
      .set('Authorization', `token ${this.cookieService.get('authToken')}`);
  }
}
