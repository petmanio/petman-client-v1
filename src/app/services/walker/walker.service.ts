import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private _http: HttpClient) {
  }

  getById(options: IWalkerGetByIdRequest): Observable<IWalkerGetByIdResponse> {
    return this._http
      .get<IWalkerGetByIdResponse>(`${environment.apiEndpoint}/api/walker/${options.walkerId}`);
  }

  deleteById(options: IWalkerDeleteRequest): Observable<IWalkerDeleteResponse> {
    return this._http
      .delete<IWalkerDeleteResponse>(`${environment.apiEndpoint}/api/walker/${options.walkerId}`)
      .map(response => true);
  }

  list(options: IWalkerListRequest): Observable<IWalkerListResponse> {
    const params = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    return this._http
      .get<IWalkerListResponse>(`${environment.apiEndpoint}/api/walker/list`, { params });
  }

  applicationList(options: IWalkerApplicationListRequest): Observable<IWalkerApplicationListResponse> {
    return this._http
      .get<IWalkerApplicationListResponse>(`${environment.apiEndpoint}/api/walker/${options.walkerId}/applications`);
  }

  create(options: IWalkerCreateRequest): Observable<IWalkerCreateResponse> {
    const formData: FormData = new FormData();
    formData.append('description', options.description);
    formData.append('cost', options.cost);

    return this._http
      .post(`${environment.apiEndpoint}/api/walker/create`, formData);
  }

  apply(options: IWalkerApplyRequest): Observable<IWalkerApplyResponse> {
    return this._http
      .post<IWalkerApplyResponse>(`${environment.apiEndpoint}/api/walker/${options.walkerId}/apply`, {});
  }

  updateApplicationStatus(options: IWalkerUpdateApplicationStatusRequest): Observable<IWalkerUpdateApplicationStatusResponse> {
    return this._http
      .put<IWalkerUpdateApplicationStatusResponse>(`${environment.apiEndpoint}/api/walker/application/${options.applicationId}/status`,
        options)
      .map(response => true);
  }

  rateApplication(options: IWalkerRateApplicationRequest): Observable<IWalkerRateApplicationResponse> {
    return this._http
      .put(`${environment.apiEndpoint}/api/walker/application/${options.applicationId}/rate`, options)
      .map(response => true);
  }
}
