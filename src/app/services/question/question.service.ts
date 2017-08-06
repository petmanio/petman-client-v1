import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {
  IQuestionCreateRequest,
  IQuestionCreateResponse,
  IQuestionDeleteRequest,
  IQuestionDeleteResponse,
  IQuestionGetByIdRequest,
  IQuestionGetByIdResponse,
  IQuestionListRequest,
  IQuestionListResponse
} from '../../models/api';
import { SailsService } from 'angular2-sails';

export interface IQuestionService {
  create(options: IQuestionCreateRequest): Observable<IQuestionCreateResponse>,
  getById(options: IQuestionGetByIdRequest): Observable<IQuestionGetByIdResponse>,
  deleteById(options: IQuestionDeleteRequest): Observable<IQuestionDeleteResponse>,
  list(options: IQuestionListRequest): Observable<IQuestionListResponse>,
}

@Injectable()
export class QuestionService implements IQuestionService {

  constructor(private _http: Http, private _sailsService: SailsService) {
  }


  create(options: IQuestionCreateRequest): Observable<IQuestionCreateResponse> {
    const headers = new Headers();
    const formData: FormData = new FormData();

    headers.append('x-auth-token', localStorage.getItem('token'));

    formData.append('text', options.text);

    return this._http
      .post(`${environment.apiEndpoint}/api/question/create`,
        formData,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  getById(options: IQuestionGetByIdRequest): Observable<IQuestionGetByIdResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/question/${options.questionId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  deleteById(options: IQuestionDeleteRequest): Observable<IQuestionDeleteResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .delete(`${environment.apiEndpoint}/api/question/${options.questionId}`,
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }

  list(options: IQuestionListRequest): Observable<IQuestionListResponse> {
    const headers = new Headers();
    const params: URLSearchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    params.set('skip', options.skip.toString());
    params.set('limit', options.limit.toString());

    return this._http
      .get(`${environment.apiEndpoint}/api/question/list`,
        { headers, withCredentials: true, search: params }
      )
      .map(response => response.json());
  }
}
