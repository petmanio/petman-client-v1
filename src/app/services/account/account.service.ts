import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { IAccountResetPasswordRequest, IAccountResetPasswordResponse } from "../../models/api";
import { UtilService } from '../util/util.service';

export interface IAccountService {
  resetPassword(options: IAccountResetPasswordRequest): Observable<IAccountResetPasswordResponse>
}

@Injectable()
export class AccountService implements IAccountService {

  constructor(private http: Http, private utilService: UtilService) { }

  public resetPassword(options: IAccountResetPasswordRequest): Observable<IAccountResetPasswordResponse> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(`${environment.apiEndpoint}/api/account/reset-password`,
        { email: options.email },
        { headers, withCredentials: true }
      )
      .map(response => response.ok);
  }
}
