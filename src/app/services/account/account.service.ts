import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UtilService } from '../util/util.service';

export interface IAccountService {
}

@Injectable()
export class AccountService implements IAccountService {

  constructor(private http: Http, private utilService: UtilService) { }
}
