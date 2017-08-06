/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { AdoptService } from './adopt.service';

describe('AdoptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptService]
    });
  });

  it('should ...', inject([AdoptService], (service: AdoptService) => {
    expect(service).toBeTruthy();
  }));
});
