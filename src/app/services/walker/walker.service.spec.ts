/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WalkerService } from './walker.service';

describe('WalkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalkerService]
    });
  });

  it('should ...', inject([WalkerService], (service: WalkerService) => {
    expect(service).toBeTruthy();
  }));
});
