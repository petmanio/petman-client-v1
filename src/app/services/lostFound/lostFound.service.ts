import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { assign } from 'lodash';
import { environment } from '../../../environments/environment';
import {
  ILostFoundCommentCreateRequest,
  ILostFoundCommentListRequest,
  ILostFoundCommentListResponse,
  ILostFoundCommentStreamJoinRequest,
  ILostFoundCreateRequest,
  ILostFoundCreateResponse,
  ILostFoundDeleteRequest,
  ILostFoundDeleteResponse,
  ILostFoundGetByIdRequest,
  ILostFoundGetByIdResponse,
  ILostFoundListRequest,
  ILostFoundListResponse
} from '../../models/api';
import { SailsService } from 'angular2-sails';

export interface ILostFoundService {
  getById(options: ILostFoundGetByIdRequest): Observable<ILostFoundGetByIdResponse>,
  deleteById(options: ILostFoundDeleteRequest): Observable<ILostFoundDeleteResponse>,
  list(options: ILostFoundListRequest): Observable<ILostFoundListResponse>,
  create(options: ILostFoundCreateRequest): Observable<ILostFoundCreateResponse>,
  getCommentList(options: ILostFoundCommentListRequest): Observable<ILostFoundCommentListResponse>,
  commentCreate(options: ILostFoundCommentCreateRequest): Observable<any>,
  joinComment(options: ILostFoundCommentStreamJoinRequest): Observable<any>
}

@Injectable()
export class LostFoundService implements ILostFoundService {

  constructor(private _http: Http, private _sailsService: SailsService) {
  }

  getById(options: ILostFoundGetByIdRequest): Observable<ILostFoundGetByIdResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  deleteById(options: ILostFoundDeleteRequest): Observable<ILostFoundDeleteResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .delete(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }

  list(options: ILostFoundListRequest): Observable<ILostFoundListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/lost-found/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  create(options: ILostFoundCreateRequest): Observable<ILostFoundCreateResponse> {
    const headers = new Headers();
    const formData: FormData = new FormData();

    headers.append('x-auth-token', localStorage.getItem('token'));

    formData.append('description', options.description);
    formData.append('type', options.type);

    if (options.images && options.images.length) {
      options.images.forEach(file => {
        formData.append('images', file, file.name);
      });
    }

    return this._http
      .post(`${environment.apiEndpoint}/api/lost-found/create`,
        formData,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  getCommentList(options: ILostFoundCommentListRequest): Observable<ILostFoundCommentListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}/comment/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  commentCreate(options: ILostFoundCommentCreateRequest): Observable<any> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .post(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}/comment/create`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }

  // TODO: think about using action or not
  // TODO: is this right using map
  joinComment(options: ILostFoundCommentStreamJoinRequest): Observable<any> {
    options = assign({}, options, { 'x-auth-token':  localStorage.getItem('token') });
    this._sailsService.get(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}/comment/join`, options);
    return this._sailsService.on('connect')
      .map(() => this._sailsService.get(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}/comment/join`, options));
  }
}
