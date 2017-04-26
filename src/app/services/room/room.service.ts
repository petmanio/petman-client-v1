import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import {
  IRoomApplyRequest, IRoomApplyResponse,
  IRoomCreateRequest, IRoomCreateResponse, IRoomGetByIdRequest, IRoomGetByIdResponse, IRoomListRequest,
  IRoomListResponse, IRoomUpdateApplicationRequest, IRoomUpdateApplicationResponse
} from '../../models/api';

export interface IRoomService {
  getById(options: IRoomGetByIdRequest): Observable<IRoomGetByIdResponse>,
  list(options: IRoomListRequest): Observable<IRoomListResponse>,
  create(options: IRoomCreateRequest): Observable<IRoomCreateResponse>,
  apply(options: IRoomApplyRequest): Observable<IRoomApplyResponse>,
  updateApplication(options: IRoomUpdateApplicationRequest): Observable<IRoomUpdateApplicationResponse>
}

@Injectable()
export class RoomService implements IRoomService {

  constructor(private http: Http) {

  }

  getById(options: IRoomGetByIdRequest): Observable<IRoomGetByIdResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
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

    return this.http
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

    return this.http
      .post(`${environment.apiEndpoint}/api/room/create`,
        formData,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  apply(options: IRoomApplyRequest): Observable<IRoomApplyResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .post(`${environment.apiEndpoint}/api/room/${options.roomId}/apply`, {},
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }

  updateApplication(options: IRoomUpdateApplicationRequest): Observable<IRoomUpdateApplicationResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .put(`${environment.apiEndpoint}/api/room/application/${options.id}`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }
}
