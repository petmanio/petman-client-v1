import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import {
  IMessageConversationRequest,
  IMessageConversationResponse,
  IMessageConversationsRequest,
  IMessageConversationsResponse,
  IMessageCreateRequest,
  IMessageCreateResponse
} from '../../models/api';

export interface IMessageService {
  create(options: IMessageCreateRequest): Observable<IMessageCreateResponse>,
  getConversation(options: IMessageConversationRequest): Observable<IMessageConversationResponse>,
  getConversations(options: IMessageConversationsRequest): Observable<IMessageConversationsResponse>
}

@Injectable()
export class MessageService implements IMessageService {

  constructor(private _http: Http) {
  }

  create(options: IMessageCreateRequest): Observable<IMessageCreateResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .post(`${environment.apiEndpoint}/api/massage/user/${options.userEntityId}/create`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  getConversation(options: IMessageConversationRequest): Observable<IMessageConversationResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/message/user/${options.userEntityId}/conversation`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }

  getConversations(options: IMessageConversationsRequest): Observable<IMessageConversationsResponse> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-auth-token', localStorage.getItem('token'));

    return this._http
      .get(`${environment.apiEndpoint}/api/message/conversations`,
        { headers, withCredentials: true }
      )
      .map(response => response.json());
  }
}
