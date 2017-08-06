/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { SocketService } from './socket.service';

describe('SocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService]
    });
  });

  it('should ...', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
