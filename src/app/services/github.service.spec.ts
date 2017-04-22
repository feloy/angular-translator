import { TestBed, inject } from '@angular/core/testing';

import { GithubService } from './github.service';

describe('GithubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubService]
    });
  });

  it('should ...', inject([GithubService], (service: GithubService) => {
    expect(service).toBeTruthy();
  }));
});
