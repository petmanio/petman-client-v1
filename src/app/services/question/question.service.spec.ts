/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';

describe('AdoptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionService]
    });
  });

  it('should ...', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
});
