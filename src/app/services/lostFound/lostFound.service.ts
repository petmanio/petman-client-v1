import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private _http: HttpClient, private _sailsService: SailsService) {
  }

  getById(options: ILostFoundGetByIdRequest): Observable<ILostFoundGetByIdResponse> {
    return this._http
      .get<ILostFoundGetByIdResponse>(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}`);
  }

  deleteById(options: ILostFoundDeleteRequest): Observable<ILostFoundDeleteResponse> {
    return this._http
      .delete<ILostFoundDeleteResponse>(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}`)
      .map(response => true);
  }

  list(options: ILostFoundListRequest): Observable<ILostFoundListResponse> {
    const params = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    return this._http
      .get<ILostFoundListResponse>(`${environment.apiEndpoint}/api/lost-found/list`, { params });
  }

  create(options: ILostFoundCreateRequest): Observable<ILostFoundCreateResponse> {
    const formData: FormData = new FormData();

    formData.append('description', options.description);
    formData.append('type', options.type);

    if (options.images && options.images.length) {
      options.images.forEach(file => {
        formData.append('images', file, file.name);
      });
    }

    return this._http
      .post<ILostFoundCreateResponse>(`${environment.apiEndpoint}/api/lost-found/create`, formData);
  }

  getCommentList(options: ILostFoundCommentListRequest): Observable<ILostFoundCommentListResponse> {
    const params: HttpParams = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    return this._http
      .get<ILostFoundCommentListResponse>(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}/comment/list`,
        { params }
      );
  }

  commentCreate(options: ILostFoundCommentCreateRequest): Observable<any> {
    return this._http
      .post<any>(`${environment.apiEndpoint}/api/lost-found/${options.lostFoundId}/comment/create`, options)
      .map(response => true);
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
