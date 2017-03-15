import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import { IBlogListRequest, IBlogListResponse } from "../../models/api";

export interface IBlogService {
  list(options: IBlogListRequest): Observable<IBlogListResponse[]>
}

@Injectable()
export class BlogService implements IBlogService {

  constructor(private http: Http) {

  }

  list(options: IBlogListRequest): Observable<IBlogListResponse[]> {
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this.http
      .get(`${environment.apiEndpoint}/api/blog/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
