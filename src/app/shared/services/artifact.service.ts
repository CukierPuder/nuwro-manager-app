import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiEndpoints } from '../api-endpoints';
import { Artifact } from '../models/artifact.model';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {
  private httpHeaders: HttpHeaders;
  private apiEndpoints: ApiEndpoints;

  constructor(private client: HttpClient, private cookieService: CookieService) {
    this.apiEndpoints = new ApiEndpoints();
  }

  public getAll(): Observable<Array<Artifact>> {
    this.refreshHttpHeaders();
    return this.client.get<Array<Artifact>>(this.apiEndpoints.artifactGetAllPost(), { headers: this.httpHeaders });
  }

  public getRelatedArtifacts(id: number): Observable<Array<Artifact>> {
    this.refreshHttpHeaders();
    const params = new HttpParams()
      .set('resultfile', id.toString());
    const options = { params: params, headers: this.httpHeaders }
    return this.client.get<Array<Artifact>>(this.apiEndpoints.artifactGetAllPost(), options)
  }

  public post(artifact: Artifact): Observable<Artifact> {
    this.refreshHttpHeaders();
    const formData = new FormData();
    formData.append('resultfile', artifact.resultfile.toString());
    formData.append('filename', artifact.filename);
    formData.append('artifact', artifact.artifact);

    return this.client.post<Artifact>(this.apiEndpoints.artifactGetAllPost(), formData, { headers: this.httpHeaders });
  }

  private refreshHttpHeaders(): void {
    this.httpHeaders = new HttpHeaders()
      .set('Authorization', `token ${this.cookieService.get('authToken')}`);
  }
}
