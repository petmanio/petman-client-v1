import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { INotificationListRequest, INotificationListResponse } from '../../models/api';

export interface INotificationService {
  list(options: INotificationListRequest): Observable<INotificationListResponse>,
}

@Injectable()
export class NotificationService implements INotificationService {

  constructor(private _http: Http) {
  }

  list(options: INotificationListRequest): Observable<INotificationListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/notification/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
