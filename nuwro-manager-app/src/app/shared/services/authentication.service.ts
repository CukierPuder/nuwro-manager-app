import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiEndpoints } from '../api-endpoints';
import { AuthToken } from '../models/auth-token.model';
import { UserSignIn } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpOptions;
  private apiEndpoints: ApiEndpoints;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.apiEndpoints = new ApiEndpoints();
  }

  postUserCredentials(user: UserSignIn): Observable<AuthToken> {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post<AuthToken>(this.apiEndpoints.userSignIn(), formData);
  }

  signIn(authToken: string): void {
    this.cookieService.set('authToken', authToken);
  }

  signOut(): void {
    this.cookieService.delete('authToken');
  }

  isAuthenticated(): boolean {
    if (this.cookieService.check('authToken')) {
      return true;
    }
    return false;
  }
}
