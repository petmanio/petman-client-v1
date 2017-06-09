import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {
  IWalkerApplicationMessageCreateRequest,
  IWalkerApplicationMessageListRequest,
  IWalkerApplicationMessageListResponse,
  IWalkerApplyRequest,
  IWalkerApplyResponse,
  IWalkerCreateRequest,
  IWalkerCreateResponse,
  IWalkerDeleteByIdRequest,
  IWalkerDeleteByIdResponse,
  IWalkerGetByIdRequest,
  IWalkerGetByIdResponse,
  IWalkerListRequest,
  IWalkerListResponse,
  IWalkerShareOnFacebookRequest,
  IWalkerUpdateApplicationRequest,
  IWalkerUpdateApplicationResponse
} from '../../models/api';
import { SailsService } from 'angular2-sails';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface IWalkerService {
  getById(options: IWalkerGetByIdRequest): Observable<IWalkerGetByIdResponse>,
  deleteById(options: IWalkerDeleteByIdRequest): Observable<IWalkerDeleteByIdResponse>,
  list(options: IWalkerListRequest): Observable<IWalkerListResponse>,
  create(options: IWalkerCreateRequest): Observable<IWalkerCreateResponse>,
  apply(options: IWalkerApplyRequest): Observable<IWalkerApplyResponse>,
  updateApplication(options: IWalkerUpdateApplicationRequest): Observable<IWalkerUpdateApplicationResponse>,
  getApplicationMessageList(options: IWalkerApplicationMessageListRequest): Observable<IWalkerApplicationMessageListResponse>,
  applicationMessageCreate(options: IWalkerApplicationMessageCreateRequest): Observable<any>,
  shareOnFacebook(options: IWalkerShareOnFacebookRequest): Observable<any>
}

@Injectable()
export class WalkerService implements IWalkerService {

  constructor(private _http: Http, private _sailsService: SailsService) {
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

  deleteById(options: IWalkerDeleteByIdRequest): Observable<IWalkerDeleteByIdResponse> {
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

  create(options: IWalkerCreateRequest): Observable<IWalkerCreateResponse> {
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

  updateApplication(options: IWalkerUpdateApplicationRequest): Observable<IWalkerUpdateApplicationResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .put(`${environment.apiEndpoint}/api/walker/application/${options.id}`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  getApplicationMessageList(options: IWalkerApplicationMessageListRequest): Observable<IWalkerApplicationMessageListResponse> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/walker/application/${options.applicationId}/message/list`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  applicationMessageCreate(options: IWalkerApplicationMessageCreateRequest): Observable<any> {
    const headers = new Headers();
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .post(`${environment.apiEndpoint}/api/walker/application/${options.applicationId}/message/create`, options,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }

  shareOnFacebook(options: IWalkerShareOnFacebookRequest): Observable<any> {
    const subject = new ReplaySubject(1);
    FB.ui(options, response => {
      if (response && response.post_id) {
        subject.next(response);
      }else {
        subject.error(new Error());
      }
    });

    return subject;
  }
}
