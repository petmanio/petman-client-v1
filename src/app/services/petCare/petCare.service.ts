import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import { IPetCareListRequest, IPetCareListResponse, IPetCarePinsRequest, IPetCarePinsResponse } from '../../models/api';

export interface IPetCareService {
  list(options: IPetCareListRequest): Observable<IPetCareListResponse>
  pins(options: IPetCarePinsRequest): Observable<IPetCarePinsResponse[]>
}

@Injectable()
export class PetCareService implements IPetCareService {

  constructor(private http: Http) {

  }

  list(options: IPetCareListRequest): Observable<IPetCareListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());
    params.set('type', options.type.toString());

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

    params.set('type', options.type.toString());

    return this.http
      .get(`${environment.apiEndpoint}/api/pet-care/pins`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
