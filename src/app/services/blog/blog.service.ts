import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { IBlogListRequest, IBlogListResponse } from '../../models/api';
import { Observable } from 'rxjs/Observable';

export interface IBlogService {
  list(options: IBlogListRequest): Observable<IBlogListResponse>
}

@Injectable()
export class BlogService implements IBlogService {

  constructor(private _http: HttpClient) {

  }

  list(options: IBlogListRequest): Observable<IBlogListResponse> {
    const params = (new HttpParams())
      .set('skip', options.skip.toString())
      .set('limit', options.limit.toString());

    return this._http
      .get<IBlogListResponse>(`${environment.apiEndpoint}/api/blog/list`, { params });
  }
}
