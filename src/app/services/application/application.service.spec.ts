/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicationService } from './application.service';

describe('ApplicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationService]
    });
  });

  it('should ...', inject([ApplicationService], (service: ApplicationService) => {
    expect(service).toBeTruthy();
  }));
});
