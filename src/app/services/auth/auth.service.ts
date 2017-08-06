import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
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

  constructor(private http: Http) {}

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
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(`${environment.apiEndpoint}/api/auth/login`,
        options,
        { headers, withCredentials: true }
      )
      .map(response => response.json())
      .map(body => {
        localStorage.setItem('token', body.token);
        return body;
      })
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return Observable.of(true);
  }

  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .get(`${environment.apiEndpoint}/api/auth/current-user`, { headers, withCredentials: true })
      .map(response => {
        const body = response.json();
        localStorage.setItem('userId', body.id);
        return body
      });
  }

}
