/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LostFoundService } from './lostFound.service';

describe('LostFoundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LostFoundService]
    });
  });

  it('should ...', inject([LostFoundService], (service: LostFoundService) => {
    expect(service).toBeTruthy();
  }));
});
