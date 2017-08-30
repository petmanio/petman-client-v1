import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { INotificationListRequest, INotificationListResponse, INotificationSeenRequest, INotificationSeenResponse } from '../../models/api';

export interface INotificationService {
  list(options: INotificationListRequest): Observable<INotificationListResponse>,
  seen(options: INotificationSeenRequest): Observable<INotificationSeenResponse>
}

@Injectable()
export class NotificationService implements INotificationService {

  constructor(private _http: HttpClient) {
  }

  list(options: INotificationListRequest): Observable<INotificationListResponse> {
    const params = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    return this._http
      .get<INotificationListResponse>(`${environment.apiEndpoint}/api/notification/list`, { params });
  }

  seen(options: INotificationSeenRequest): Observable<INotificationSeenResponse> {
    return this._http
      .put<INotificationSeenResponse>(`${environment.apiEndpoint}/api/notification/seen`, options);
  }
}
