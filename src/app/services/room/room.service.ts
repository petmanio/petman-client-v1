import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private _http: HttpClient) {
  }

  getById(options: IRoomGetByIdRequest): Observable<IRoomGetByIdResponse> {
    return this._http
      .get<IRoomGetByIdResponse>(`${environment.apiEndpoint}/api/room/${options.roomId}`);
  }

  deleteById(options: IRoomDeleteRequest): Observable<IRoomDeleteResponse> {
    return this._http
      .delete<IRoomDeleteResponse>(`${environment.apiEndpoint}/api/room/${options.roomId}`)
      .map(response => true);
  }

  list(options: IRoomListRequest): Observable<IRoomListResponse> {
    const params = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/room/list`, { params });
  }

  applicationList(options: IRoomApplicationListRequest): Observable<IRoomApplicationListResponse> {
    return this._http
      .get<IRoomApplicationListResponse>(`${environment.apiEndpoint}/api/room/${options.roomId}/applications`);
  }

  create(options: IRoomCreateRequest): Observable<IRoomCreateResponse> {
    const formData: FormData = new FormData();
    formData.append('description', options.description);
    formData.append('cost', options.cost);

    if (options.images && options.images.length) {
      options.images.forEach(file => {
        formData.append('images', file, file.name);
      });
    }

    return this._http
      .post<IRoomCreateResponse>(`${environment.apiEndpoint}/api/room/create`, formData);
  }

  apply(options: IRoomApplyRequest): Observable<IRoomApplyResponse> {
    return this._http
      .post<IRoomApplyResponse>(`${environment.apiEndpoint}/api/room/${options.roomId}/apply`, {});
  }

  updateApplicationStatus(options: IRoomUpdateApplicationStatusRequest): Observable<IRoomUpdateApplicationStatusResponse> {
    return this._http
      .put<IRoomUpdateApplicationStatusResponse>(`${environment.apiEndpoint}/api/room/application/${options.applicationId}/status`, options)
      .map(response => true);
  }

  rateApplication(options: IRoomRateApplicationRequest): Observable<IRoomRateApplicationResponse> {
    return this._http
      .put<IRoomRateApplicationResponse>(`${environment.apiEndpoint}/api/room/application/${options.applicationId}/rate`, options)
      .map(response => true);
  }
}
