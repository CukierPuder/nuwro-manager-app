import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../api-endpoints';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Datafile } from '../models/datafile.model';

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
    formData.append('x_axis', datafile.x_axis);
    formData.append('y_axis', datafile.y_axis);
    formData.append('filename', datafile.filename);
    formData.append('input_file', datafile.input_file);

    formData.forEach(pair => {
      console.log(pair);
    });

    return this.client.post<Datafile>(this.apiEndpoints.datafileGetAllPost(), formData, { headers: this.httpHeaders });
  }

  private refreshHttpHeaders(): void {
    this.httpHeaders = new HttpHeaders()
      .set('Authorization', `token ${this.cookieService.get('authToken')}`);
  }
}
