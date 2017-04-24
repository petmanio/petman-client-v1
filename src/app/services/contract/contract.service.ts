import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IContractCountRequest, IContractCountResponse, IContractListRequest, IContractListResponse } from '../../models/api';

export interface IContractService {
  count(options: IContractCountRequest): Observable<IContractCountResponse>
  list(options: IContractListRequest): Observable<IContractListResponse>
}

@Injectable()
export class ContractService implements IContractService {

  constructor(private http: Http) {

  }

  count(options: IContractCountRequest): Observable<IContractCountResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .get(`${environment.apiEndpoint}/api/contract/count`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  list(options: IContractListRequest): Observable<IContractListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this.http
      .get(`${environment.apiEndpoint}/api/contract/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
