import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import {
  ILocationFiltersRequest,
  ILocationFiltersResponse,
  ILocationListRequest,
  ILocationListResponse,
  ILocationPinsRequest,
  ILocationPinsResponse
} from '../../models/api';

export interface ILocationService {
  filters(options: ILocationFiltersRequest): Observable<ILocationFiltersResponse>,
  list(options: ILocationListRequest): Observable<ILocationListResponse>,
  pins(options: ILocationPinsRequest): Observable<ILocationPinsResponse[]>
}

@Injectable()
export class LocationService implements ILocationService {

  constructor(private _http: HttpClient) {}

  filters(options: ILocationFiltersRequest): Observable<ILocationFiltersResponse> {
    return this._http
      .get<ILocationFiltersResponse>(`${environment.apiEndpoint}/api/location/filters`);
  }

  list(options: ILocationListRequest): Observable<ILocationListResponse> {
    const params = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    if (options.categories) {
      options.categories.forEach(c => params.append('categories', c.toString()))
    }

    return this._http
      .get<ILocationFiltersResponse>(`${environment.apiEndpoint}/api/location/list`, { params });
  }

  pins(options: ILocationPinsRequest): Observable<ILocationPinsResponse[]> {
    const params = new HttpParams();

    if (options.categories) {
      options.categories.forEach(c => params.append('categories', c.toString()))
    }

    return this._http
      .get<ILocationPinsResponse[]>(`${environment.apiEndpoint}/api/location/pins`, { params });
  }
}
