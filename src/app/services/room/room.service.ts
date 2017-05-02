import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {
  IRoomApplicationMessageCreateRequest,
  IRoomApplicationMessageJoinRequest,
  IRoomApplicationMessageListRequest,
  IRoomApplicationMessageListResponse,
  IRoomApplyRequest,
  IRoomApplyResponse,
  IRoomCreateRequest,
  IRoomCreateResponse,
  IRoomGetByIdRequest,
  IRoomGetByIdResponse,
  IRoomListRequest,
  IRoomListResponse,
  IRoomUpdateApplicationRequest,
  IRoomUpdateApplicationResponse
} from '../../models/api';
import { SailsService } from 'angular2-sails';
import { assign } from 'lodash';

export interface IRoomService {
  getById(options: IRoomGetByIdRequest): Observable<IRoomGetByIdResponse>,
  list(options: IRoomListRequest): Observable<IRoomListResponse>,
  create(options: IRoomCreateRequest): Observable<IRoomCreateResponse>,
  apply(options: IRoomApplyRequest): Observable<IRoomApplyResponse>,
  updateApplication(options: IRoomUpdateApplicationRequest): Observable<IRoomUpdateApplicationResponse>,
  getApplicationMessageList(options: IRoomApplicationMessageListRequest): Observable<IRoomApplicationMessageListResponse>,
  applicationMessageCreate(options: IRoomApplicationMessageCreateRequest): Observable<any>
}

@Injectable()
export class RoomService implements IRoomService {

  constructor(private _http: Http, private _sailsService: SailsService) {
  }

  getById(options: IRoomGetByIdRequest): Observable<IRoomGetByIdResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/room/${options.roomId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  list(options: IRoomListRequest): Observable<IRoomListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/room/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  create(options: IRoomCreateRequest): Observable<IRoomCreateResponse> {
    const headers = new Headers();
    const formData: FormData = new FormData();

    headers.append('x-auth-token', localStorage.getItem('token'));

    formData.append('name', options.name);
    formData.append('description', options.description);
    formData.append('cost', options.cost);
    // TODO: functionality for future
    // formData.append('limit', options.limit);

    if (options.images && options.images.length) {
      options.images.forEach(file => {
        formData.append('images', file, file.name);
      });
    }

    return this._http
      .post(`${environment.apiEndpoint}/api/room/create`,
        formData,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  apply(options: IRoomApplyRequest): Observable<IRoomApplyResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .post(`${environment.apiEndpoint}/api/room/${options.roomId}/apply`, {},
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  updateApplication(options: IRoomUpdateApplicationRequest): Observable<IRoomUpdateApplicationResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .put(`${environment.apiEndpoint}/api/room/application/${options.id}`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  getApplicationMessageList(options: IRoomApplicationMessageListRequest): Observable<IRoomApplicationMessageListResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/room/application/${options.applicationId}/message/list`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  applicationMessageCreate(options: IRoomApplicationMessageCreateRequest): Observable<any> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .post(`${environment.apiEndpoint}/api/room/application/${options.applicationId}/message/create`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }
}
