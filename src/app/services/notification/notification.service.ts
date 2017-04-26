import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { INotificationCountRequest, INotificationCountResponse, INotificationListRequest, INotificationListResponse } from '../../models/api';

export interface INotificationService {
  count(options: INotificationCountRequest): Observable<INotificationCountResponse>
  list(options: INotificationListRequest): Observable<INotificationListResponse>
}

@Injectable()
export class NotificationService implements INotificationService {

  constructor(private http: Http) {

  }

  count(options: INotificationCountRequest): Observable<INotificationCountResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .get(`${environment.apiEndpoint}/api/application/count`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  list(options: INotificationListRequest): Observable<INotificationListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this.http
      .get(`${environment.apiEndpoint}/api/notification/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
