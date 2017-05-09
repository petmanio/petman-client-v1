/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
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
