import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { IAuthCurrentUserRequest, IAuthCurrentUserResponse, ILoginRequest, ILoginResponse } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface IAuthService {
  fbLogin(): Observable<any>,
  login(options: ILoginRequest): Observable<ILoginResponse>,
  logout(): Observable<boolean>,
  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse>
}

@Injectable()
export class AuthService implements IAuthService {

  constructor(private _http: HttpClient) {}

  fbLogin(): Observable<any> {
    const subject = new ReplaySubject(1);
    FB.login((response) => {
      if (response.authResponse) {
        subject.next(response.authResponse);
      } else {
        subject.error(new Error());
      }
    }, { scope: environment.fb.scope });

    return subject;
  }

  login(options: ILoginRequest): Observable<ILoginResponse> {
    return this._http
      .post<ILoginResponse>(`${environment.apiEndpoint}/api/auth/login`, options)
      .map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      })
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedUserId');
    location.reload();
    return Observable.of(true);
  }

  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse> {
    return this._http
      .get<IAuthCurrentUserResponse>(`${environment.apiEndpoint}/api/auth/current-user`)
      .map(response => {
        localStorage.setItem('user', JSON.stringify(response));
        return response
      });
  }

}
