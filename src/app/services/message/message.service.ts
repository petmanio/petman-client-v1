import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private _http: HttpClient) {
  }

  create(options: IMessageCreateRequest): Observable<IMessageCreateResponse> {
    return this._http
      .post<IMessageCreateResponse>(`${environment.apiEndpoint}/api/massage/user/${options.userEntityId}/create`, options);
  }

  getConversation(options: IMessageConversationRequest): Observable<IMessageConversationResponse> {
    return this._http
      .get<IMessageConversationResponse>(`${environment.apiEndpoint}/api/message/user/${options.userEntityId}/conversation`);
  }

  getConversations(options: IMessageConversationsRequest): Observable<IMessageConversationsResponse> {
    return this._http
      .get<IMessageConversationsResponse>(`${environment.apiEndpoint}/api/message/conversations`);
  }
}
