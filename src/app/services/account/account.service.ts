import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';

export interface IAccountService {
}

@Injectable()
export class AccountService implements IAccountService {

  constructor(private http: Http, private utilService: UtilService) { }
}
