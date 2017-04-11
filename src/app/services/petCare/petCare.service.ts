import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import {
  IPetCareFiltersRequest, IPetCareFiltersResponse, IPetCareListRequest, IPetCareListResponse, IPetCarePinsRequest,
  IPetCarePinsResponse
} from '../../models/api';

export interface IPetCareService {
  filters(options: IPetCareFiltersRequest): Observable<IPetCareFiltersResponse>,
  list(options: IPetCareListRequest): Observable<IPetCareListResponse>,
  pins(options: IPetCarePinsRequest): Observable<IPetCarePinsResponse[]>
}

@Injectable()
export class PetCareService implements IPetCareService {

  constructor(private http: Http) {

  }

  filters(options: IPetCareFiltersRequest): Observable<IPetCareFiltersResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .get(`${environment.apiEndpoint}/api/pet-care/filters`,
        {headers, withCredentials: true}
      )
      .map(response => response.json());
  }

  list(options: IPetCareListRequest): Observable<IPetCareListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());
    if (options.categories) {
      options.categories.forEach(c => params.set('categories', c.toString()))
    }

    return this.http
      .get(`${environment.apiEndpoint}/api/pet-care/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  pins(options: IPetCarePinsRequest): Observable<IPetCarePinsResponse[]> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    if (options.categories) {
      options.categories.forEach(c => params.set('categories', c.toString()))
    }

    return this.http
      .get(`${environment.apiEndpoint}/api/pet-care/pins`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
