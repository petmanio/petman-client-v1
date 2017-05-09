import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {
  IAdoptCreateRequest,
  IAdoptCreateResponse,
  IAdoptGetByIdRequest,
  IAdoptGetByIdResponse,
  IAdoptListRequest,
  IAdoptListResponse
} from '../../models/api';
import { SailsService } from 'angular2-sails';

export interface IAdoptService {
  getById(options: IAdoptGetByIdRequest): Observable<IAdoptGetByIdResponse>,
  list(options: IAdoptListRequest): Observable<IAdoptListResponse>,
  create(options: IAdoptCreateRequest): Observable<IAdoptCreateResponse>
}

@Injectable()
export class AdoptService implements IAdoptService {

  constructor(private _http: Http, private _sailsService: SailsService) {
  }

  getById(options: IAdoptGetByIdRequest): Observable<IAdoptGetByIdResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/adopt/${options.adoptId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  list(options: IAdoptListRequest): Observable<IAdoptListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/adopt/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  create(options: IAdoptCreateRequest): Observable<IAdoptCreateResponse> {
    const headers = new Headers();
    const formData: FormData = new FormData();

    headers.append('x-auth-token', localStorage.getItem('token'));

    formData.append('description', options.description);
    formData.append('contactPhone', options.contactPhone);

    if (options.images && options.images.length) {
      options.images.forEach(file => {
        formData.append('images', file, file.name);
      });
    }

    return this._http
      .post(`${environment.apiEndpoint}/api/adopt/create`,
        formData,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }
}
