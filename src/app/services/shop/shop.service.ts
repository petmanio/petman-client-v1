import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import { IShopListRequest, IShopListResponse, IShopPinsRequest, IShopPinsResponse } from '../../models/api';

export interface IShopService {
  list(options: IShopListRequest): Observable<IShopListResponse>
  pins(options: IShopPinsRequest): Observable<IShopPinsResponse[]>
}

@Injectable()
export class ShopService implements IShopService {

  constructor(private http: Http) {

  }

  list(options: IShopListRequest): Observable<IShopListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this.http
      .get(`${environment.apiEndpoint}/api/shop/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }

  pins(options: IShopPinsRequest): Observable<IShopPinsResponse[]> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this.http
      .get(`${environment.apiEndpoint}/api/shop/pins`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }
}