import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { assign } from 'lodash';
import { environment } from '../../../environments/environment';
import {
  IAdoptCommentCreateRequest,
  IAdoptCommentListRequest,
  IAdoptCommentListResponse,
  IAdoptCommentStreamJoinRequest,
  IAdoptCreateRequest,
  IAdoptCreateResponse,
  IAdoptDeleteRequest,
  IAdoptDeleteResponse,
  IAdoptGetByIdRequest,
  IAdoptGetByIdResponse,
  IAdoptListRequest,
  IAdoptListResponse
} from '../../models/api';
import { SailsService } from 'angular2-sails';

export interface IAdoptService {
  getById(options: IAdoptGetByIdRequest): Observable<IAdoptGetByIdResponse>,
  deleteById(options: IAdoptDeleteRequest): Observable<IAdoptDeleteResponse>,
  list(options: IAdoptListRequest): Observable<IAdoptListResponse>,
  create(options: IAdoptCreateRequest): Observable<IAdoptCreateResponse>,
  getCommentList(options: IAdoptCommentListRequest): Observable<IAdoptCommentListResponse>,
  commentCreate(options: IAdoptCommentCreateRequest): Observable<any>,
  joinComment(options: IAdoptCommentStreamJoinRequest): Observable<any>
}

@Injectable()
export class AdoptService implements IAdoptService {

  constructor(private _http: HttpClient, private _sailsService: SailsService) {
  }

  getById(options: IAdoptGetByIdRequest): Observable<IAdoptGetByIdResponse> {
    return this._http.get(`${environment.apiEndpoint}/api/adopt/${options.adoptId}`);
  }

  deleteById(options: IAdoptDeleteRequest): Observable<IAdoptDeleteResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .delete(`${environment.apiEndpoint}/api/adopt/${options.adoptId}`)
      .map(response => true);
  }

  list(options: IAdoptListRequest): Observable<IAdoptListResponse> {
    const params: HttpParams = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/adopt/list`, { params });
  }

  create(options: IAdoptCreateRequest): Observable<IAdoptCreateResponse> {
    const formData: FormData = new FormData();

    formData.append('description', options.description);

    if (options.images && options.images.length) {
      options.images.forEach(file => {
        formData.append('images', file, file.name);
      });
    }

    return this._http
      .post(`${environment.apiEndpoint}/api/adopt/create`, formData);
  }

  getCommentList(options: IAdoptCommentListRequest): Observable<IAdoptCommentListResponse> {
    const params: HttpParams = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/adopt/${options.adoptId}/comment/list`, { params });
  }

  commentCreate(options: IAdoptCommentCreateRequest): Observable<any> {
    return this._http
      .post(`${environment.apiEndpoint}/api/adopt/${options.adoptId}/comment/create`, options,
      )
      .map(response => true);
  }

  // TODO: think about using action or not
  // TODO: is this right using map
  joinComment(options: IAdoptCommentStreamJoinRequest): Observable<any> {
    options = assign({}, options, { 'x-auth-token':  localStorage.getItem('token') });
    this._sailsService.get(`${environment.apiEndpoint}/api/adopt/${options.adoptId}/comment/join`, options);
    return this._sailsService.on('connect')
      .map(() => this._sailsService.get(`${environment.apiEndpoint}/api/adopt/${options.adoptId}/comment/join`, options));
  }
}
