import { TestBed } from '@angular/core/testing';

import { RestControllerService } from './rest-controller.service';

describe('RestControllerService', () => {
  let service: RestControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
