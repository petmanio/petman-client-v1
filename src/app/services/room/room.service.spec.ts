/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { RoomService } from './room.service';

describe('RoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomService]
    });
  });

  it('should ...', inject([RoomService], (service: RoomService) => {
    expect(service).toBeTruthy();
  }));
});
