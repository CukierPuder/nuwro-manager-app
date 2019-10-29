import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiEndpoints } from '../api-endpoints';
import { Resultfile } from '../models/resultfile.model';

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
    formData.append('description', resultfile.description);
    formData.append('x_axis', resultfile.x_axis);
    formData.append('y_axis', resultfile.y_axis);
    formData.append('result_file', resultfile.result_file);
    formData.append('related_datafiles', JSON.stringify(resultfile.getArrayOfDatafileIds()));

    return this.client.post<Resultfile>(this.apiEndpoints.resultfileGetAllPost(), formData, { headers: this.httpHeaders });
  }

  private refreshHttpHeaders(): void {
    this.httpHeaders = new HttpHeaders()
      .set('Authorization', `token ${this.cookieService.get('authToken')}`);
  }
}
