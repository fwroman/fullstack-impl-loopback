import { TestBed } from '@angular/core/testing';

import { Loopabck4ControllerService } from './loopabck4-controller.service';

describe('Loopabck4ControllerService', () => {
  let service: Loopabck4ControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loopabck4ControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
