/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { ShopService } from './location.service';

describe('ShopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopService]
    });
  });

  it('should ...', inject([ShopService], (service: ShopService) => {
    expect(service).toBeTruthy();
  }));
});
