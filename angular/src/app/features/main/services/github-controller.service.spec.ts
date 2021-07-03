import { TestBed } from '@angular/core/testing';

import { GithubControllerService } from './github-controller.service';

describe('GithubControllerService', () => {
  let service: GithubControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
