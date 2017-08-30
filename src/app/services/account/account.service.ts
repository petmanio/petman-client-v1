import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util/util.service';

export interface IAccountService {
}

@Injectable()
export class AccountService implements IAccountService {

  constructor(private _http: HttpClient, private _utilService: UtilService) { }
}
