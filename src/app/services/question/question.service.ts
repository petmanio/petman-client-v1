import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IQuestionService {}

@Injectable()
export class QuestionService implements IQuestionService {

  constructor(private _http: HttpClient) {
  }
}
