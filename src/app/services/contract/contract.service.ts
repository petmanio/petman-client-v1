import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IApplicationCountRequest, IApplicationCountResponse, IApplicationListRequest, IApplicationListResponse } from '../../models/api';

export interface IApplicationService {
  count(options: IApplicationCountRequest): Observable<IApplicationCountResponse>
  list(options: IApplicationListRequest): Observable<IApplicationListResponse>
}

@Injectable()
export class ApplicationService implements IApplicationService {

  constructor(private http: Http) {

  }

  count(options: IApplicationCountRequest): Observable<IApplicationCountResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .get(`${environment.apiEndpoint}/api/application/count`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  list(options: IApplicationListRequest): Observable<IApplicationListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this.http
      .get(`${environment.apiEndpoint}/api/application/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
