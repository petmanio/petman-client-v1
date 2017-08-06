import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
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

  constructor(private http: Http) {

  }

  filters(options: ILocationFiltersRequest): Observable<ILocationFiltersResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .get(`${environment.apiEndpoint}/api/location/filters`,
        {headers, withCredentials: true}
      )
      .map(response => response.json());
  }

  list(options: ILocationListRequest): Observable<ILocationListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());
    if (options.categories) {
      options.categories.forEach(c => params.append('categories', c.toString()))
    }

    return this.http
      .get(`${environment.apiEndpoint}/api/location/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  pins(options: ILocationPinsRequest): Observable<ILocationPinsResponse[]> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    if (options.categories) {
      options.categories.forEach(c => params.append('categories', c.toString()))
    }

    return this.http
      .get(`${environment.apiEndpoint}/api/location/pins`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
