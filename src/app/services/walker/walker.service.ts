import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {
  IWalkerApplicationListRequest,
  IWalkerApplicationListResponse,
  IWalkerApplyRequest,
  IWalkerApplyResponse,
  IWalkerCreateRequest,
  IWalkerCreateResponse,
  IWalkerDeleteRequest,
  IWalkerDeleteResponse,
  IWalkerGetByIdRequest,
  IWalkerGetByIdResponse,
  IWalkerListRequest,
  IWalkerListResponse,
  IWalkerRateApplicationRequest,
  IWalkerRateApplicationResponse,
  IWalkerUpdateApplicationStatusRequest,
  IWalkerUpdateApplicationStatusResponse,
} from '../../models/api';

export interface IWalkerService {
  getById(options: IWalkerGetByIdRequest): Observable<IWalkerGetByIdResponse>,
  deleteById(options: IWalkerDeleteRequest): Observable<IWalkerDeleteResponse>,
  list(options: IWalkerListRequest): Observable<IWalkerListResponse>,
  applicationList(options: IWalkerApplicationListRequest): Observable<IWalkerApplicationListResponse>,
  create(options: IWalkerCreateRequest): Observable<IWalkerCreateResponse>,
  apply(options: IWalkerApplyRequest): Observable<IWalkerApplyResponse>,
  updateApplicationStatus(options: IWalkerUpdateApplicationStatusRequest): Observable<IWalkerUpdateApplicationStatusResponse>,
  rateApplication(options: IWalkerRateApplicationRequest): Observable<IWalkerRateApplicationResponse>,
}

@Injectable()
export class WalkerService implements IWalkerService {

  constructor(private _http: Http) {
  }

  getById(options: IWalkerGetByIdRequest): Observable<IWalkerGetByIdResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/walker/${options.walkerId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  deleteById(options: IWalkerDeleteRequest): Observable<IWalkerDeleteResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .delete(`${environment.apiEndpoint}/api/walker/${options.walkerId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }

  list(options: IWalkerListRequest): Observable<IWalkerListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/walker/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  applicationList(options: IWalkerApplicationListRequest): Observable<IWalkerApplicationListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/walker/${options.walkerId}/applications`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  create(options: IWalkerCreateRequest): Observable<IWalkerCreateResponse> {
    const headers = new Headers();
    const formData: FormData = new FormData();

    headers.append('x-auth-token', localStorage.getItem('token'));

    formData.append('description', options.description);
    formData.append('cost', options.cost);

    return this._http
      .post(`${environment.apiEndpoint}/api/walker/create`,
        formData,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  apply(options: IWalkerApplyRequest): Observable<IWalkerApplyResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .post(`${environment.apiEndpoint}/api/walker/${options.walkerId}/apply`, {},
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  updateApplicationStatus(options: IWalkerUpdateApplicationStatusRequest): Observable<IWalkerUpdateApplicationStatusResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .put(`${environment.apiEndpoint}/api/walker/application/${options.applicationId}/status`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }

  rateApplication(options: IWalkerRateApplicationRequest): Observable<IWalkerRateApplicationResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .put(`${environment.apiEndpoint}/api/walker/application/${options.applicationId}/rate`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }
}
