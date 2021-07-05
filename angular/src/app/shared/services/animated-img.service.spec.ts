import { TestBed } from '@angular/core/testing';

import { AnimatedImgService } from './animated-img.service';

describe('AnimatedImgService', () => {
  let service: AnimatedImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimatedImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
