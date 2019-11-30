import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { ApiEndpoints } from '../api-endpoints';
import { Datafile } from '../models/datafile.model';
import { Measurement } from '../models/measurement.model';
import { Experiment } from '../models/experiment.model';

@Injectable({
  providedIn: 'root'
})
export class DatafileService {
  private httpHeaders: HttpHeaders;
  private apiEndpoints: ApiEndpoints;

  constructor(private client: HttpClient, private cookieService: CookieService) {
    this.apiEndpoints = new ApiEndpoints();
  }

  public getAll(): Observable<Array<Datafile>> {
    this.refreshHttpHeaders();
    return this.client.get<Array<Datafile>>(this.apiEndpoints.datafileGetAllPost(), { headers: this.httpHeaders });
  }

  public post(datafile: Datafile): Observable<Datafile> {
    this.refreshHttpHeaders();
    const formData = new FormData();
    formData.append('experiment', datafile.experiment.id.toString());
    formData.append('measurement', datafile.measurement.id.toString());
    formData.append('variable', datafile.variable);
    formData.append('filename', datafile.filename);
    formData.append('input_file', datafile.input_file);

    return this.client.post<Datafile>(this.apiEndpoints.datafileGetAllPost(), formData, { headers: this.httpHeaders });
  }

  public filter(experiment: Experiment, measurement: Measurement): Observable<Array<Datafile>> {
    this.refreshHttpHeaders();
    const params = new HttpParams()
      .set('experiment', experiment.id.toString())
      .set('measurement', measurement.id.toString());
    return this.client.get<Array<Datafile>>(this.apiEndpoints.datafileGetAllPost(), { headers: this.httpHeaders, params });
  }

  private refreshHttpHeaders(): void {
    this.httpHeaders = new HttpHeaders()
      .set('Authorization', `token ${this.cookieService.get('authToken')}`);
  }
}
