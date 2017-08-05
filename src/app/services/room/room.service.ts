import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {
  IRoomApplicationListRequest,
  IRoomApplicationListResponse,
  IRoomApplyRequest,
  IRoomApplyResponse,
  IRoomCreateRequest,
  IRoomCreateResponse,
  IRoomDeleteRequest,
  IRoomDeleteResponse,
  IRoomGetByIdRequest,
  IRoomGetByIdResponse,
  IRoomListRequest,
  IRoomListResponse,
  IRoomRateApplicationRequest,
  IRoomRateApplicationResponse,
  IRoomUpdateApplicationStatusRequest,
  IRoomUpdateApplicationStatusResponse,
} from '../../models/api';

export interface IRoomService {
  getById(options: IRoomGetByIdRequest): Observable<IRoomGetByIdResponse>,
  deleteById(options: IRoomDeleteRequest): Observable<IRoomDeleteResponse>,
  list(options: IRoomListRequest): Observable<IRoomListResponse>,
  applicationList(options: IRoomApplicationListRequest): Observable<IRoomApplicationListResponse>,
  create(options: IRoomCreateRequest): Observable<IRoomCreateResponse>,
  apply(options: IRoomApplyRequest): Observable<IRoomApplyResponse>,
  updateApplicationStatus(options: IRoomUpdateApplicationStatusRequest): Observable<IRoomUpdateApplicationStatusResponse>,
  rateApplication(options: IRoomRateApplicationRequest): Observable<IRoomRateApplicationResponse>,
}

@Injectable()
export class RoomService implements IRoomService {

  constructor(private _http: Http) {
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

  deleteById(options: IRoomDeleteRequest): Observable<IRoomDeleteResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .delete(`${environment.apiEndpoint}/api/room/${options.roomId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
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

  applicationList(options: IRoomApplicationListRequest): Observable<IRoomApplicationListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/room/${options.roomId}/applications`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  create(options: IRoomCreateRequest): Observable<IRoomCreateResponse> {
    const headers = new Headers();
    const formData: FormData = new FormData();

    headers.append('x-auth-token', localStorage.getItem('token'));

    formData.append('description', options.description);
    formData.append('cost', options.cost);

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

  updateApplicationStatus(options: IRoomUpdateApplicationStatusRequest): Observable<IRoomUpdateApplicationStatusResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .put(`${environment.apiEndpoint}/api/room/application/${options.applicationId}/status`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }

  rateApplication(options: IRoomRateApplicationRequest): Observable<IRoomRateApplicationResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .put(`${environment.apiEndpoint}/api/room/application/${options.applicationId}/rate`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }
}
