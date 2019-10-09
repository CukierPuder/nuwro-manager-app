import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthToken } from '../models/auth-token.model';
import { User } from '../models/user.model';
import { ApiEndpoints } from '../api-endpoints';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpOptions;
  private apiEndpoints: ApiEndpoints;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.apiEndpoints = new ApiEndpoints();
  }

  signIn(signInFormGroup: FormGroup): Observable<AuthToken> {
    const formData = new FormData();
    formData.append('email', signInFormGroup.get('email').value);
    formData.append('password', signInFormGroup.get('password').value);

    console.log(this.apiEndpoints.userSignIn());
    return this.http.post<AuthToken>(this.apiEndpoints.userSignIn(), formData);
  }
}
