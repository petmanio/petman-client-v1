import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import {ILoginResponse, ILoginRequest, IAuthCurrentUserRequest, IAuthCurrentUserResponse} from "../../models/api";

export interface IAuthService {
  fbLogin(): Observable<any>,
  login(options: ILoginRequest): Observable<ILoginResponse>,
  getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse>
}

@Injectable()
export class AuthService implements IAuthService {

  constructor(private http: Http) {

  }

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
    let headers = new Headers();
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

  public getCurrentUser(options?: IAuthCurrentUserRequest): Observable<IAuthCurrentUserResponse> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .get(`${environment.apiEndpoint}/api/auth/current-user`, { headers, withCredentials: true })
      .map(response => response.json());
  }

}
